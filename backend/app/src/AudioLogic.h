#pragma once

#include <juce_gui_extra/juce_gui_extra.h>
#include <juce_audio_devices/juce_audio_devices.h>
#include <juce_audio_utils/juce_audio_utils.h>
#include <juce_events/juce_events.h>
#include <juce_dsp/juce_dsp.h>
#include<math.h>


//==============================================================================
class AudioLogic   : public juce::AudioAppComponent,
                               private juce::Timer
{
public:
    float data_buffer[30];

    AudioLogic()
            : forwardFFT (fftOrder),
              spectrogramImage (juce::Image::RGB, 512, 512, true)
    {
        setOpaque (true);
        setAudioChannels (2, 0);  // we want a couple of input channels but no outputs
        startTimerHz (60);
        setSize (700, 500);
        std::fill_n(data_buffer, sizeof(data_buffer) / sizeof(float), 0.0f);
    }

    ~AudioLogic() override
    {
        shutdownAudio();
    }

    //==============================================================================
    void prepareToPlay (int, double) override {}
    void releaseResources() override          {}

    void getNextAudioBlock (const juce::AudioSourceChannelInfo& bufferToFill) override
    {
        if (bufferToFill.buffer->getNumChannels() > 0)
        {
            auto* channelData = bufferToFill.buffer->getReadPointer (0, bufferToFill.startSample);

            for (auto i = 0; i < bufferToFill.numSamples; ++i)
                pushNextSampleIntoFifo (channelData[i]);
        }
    }

    void timerCallback() override
    {
        if (nextFFTBlockReady)
        {
            addToBuffer();
            nextFFTBlockReady = false;
            repaint();
        }
    }

    void pushNextSampleIntoFifo (float sample) noexcept
    {
        // if the fifo contains enough data, set a flag to say
        // that the next line should now be rendered..
        if (fifoIndex == fftSize)       // [8]
        {
            if (! nextFFTBlockReady)    // [9]
            {
                std::fill (fftData.begin(), fftData.end(), 0.0f);
                std::copy (fifo.begin(), fifo.end(), fftData.begin());
                nextFFTBlockReady = true;
            }

            fifoIndex = 0;
        }

        fifo[(size_t) fifoIndex++] = sample; // [9]
    }

    void addToBuffer()
    {
        // then render our FFT data..
        forwardFFT.performFrequencyOnlyForwardTransform (fftData.data());                   // [2]
        auto fftMaxLevel = juce::FloatVectorOperations::findMinAndMax (fftData.data(), fftSize / 2); // [3]
        auto maxLevel = juce::FloatVectorOperations::findMinAndMax(fifo.data(), fftSize / 2);
        for(unsigned long y=0; y<fftData.size(); y++){
            auto skewedProportionY = 1.0f - std::exp (std::log ((float) y / (float) 512) * 0.2f);
            auto fftDataIndex = (size_t) juce::jlimit (0, fftSize / 2, (int) (skewedProportionY * fftSize / 2));
            auto fft_level = juce::jmap (fftData[fftDataIndex], 0.0f, juce::jmax (fftMaxLevel.getEnd(), 1e-5f), 0.0f, 30.0f);
            auto volume_level = juce::jmap(fifo[fftDataIndex], juce::jmin(-1e-5f, maxLevel.getStart()), juce::jmax(maxLevel.getEnd(), 1e-5f), 0.0f, 10.0f);
            data_buffer[(int) std::round(fft_level)] = volume_level;

        }
    }

    static constexpr auto fftOrder = 10;                // [1]
    static constexpr auto fftSize  = 1 << fftOrder;     // [2]

private:
    juce::dsp::FFT forwardFFT;                          // [3]
    juce::Image spectrogramImage;

    std::array<float, fftSize> fifo;                    // [4]
    std::array<float, fftSize> fftData;             // [5]
    int fifoIndex = 0;                                  // [6]
    bool nextFFTBlockReady = false;                     // [7]

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (AudioLogic)
};

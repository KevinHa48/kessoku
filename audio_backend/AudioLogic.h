#pragma once

#include <juce_gui_extra/juce_gui_extra.h>
#include <juce_audio_devices/juce_audio_devices.h>
#include <juce_audio_utils/juce_audio_utils.h>
#include <juce_events/juce_events.h>
#include <juce_dsp/juce_dsp.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdio.h>
#include <fstream>

char * fifoPipe = "/tmp/kessoku_data";
std::mutex mtx;
float FFT_MIN=0.0f;
float FFT_MAX=100.0;
float VOL_MIN=0.0f;
float VOL_MAX=1.0f;

//==============================================================================
class AudioLogic   : public juce::AudioAppComponent,
                               private juce::Timer
{
public:
    float data_buffer[30];

    AudioLogic()
            : forwardFFT (fftOrder)
    {
        setAudioChannels (2, 0);  // we want a couple of input channels but no outputs
        startTimerHz (60);
        setSize (700, 500);
        std::fill_n(data_buffer, sizeof(data_buffer) / sizeof(float), 0.0f);
        mkfifo(fifoPipe, 0666);

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

    //==============================================================================

    void timerCallback() override
    {
        if (nextFFTBlockReady)
        {
            addToBuffer();
            pipeOutput();
            nextFFTBlockReady = false;
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

    void pipeOutput(){
        int fd;
        fd = open(fifoPipe, O_WRONLY);
        std::string parse_result = parse_data();
	parse_result.append("\n");
        write(fd, parse_result.c_str(), strlen(parse_result.c_str()));
        close(fd);
    }

    std::string parse_data(){
        std::string result;
        auto buffer_size = sizeof(data_buffer)/sizeof(float);
        std::lock_guard<std::mutex> _(mtx);
        for(unsigned long i=0; i<buffer_size; i++){
            result.append(std::to_string(data_buffer[i]));
            if (i != buffer_size-1){
                result.append(" ");
            }
        }
        return result;
    }

    void addToBuffer()
    {
        auto maxVolume = juce::FloatVectorOperations::findMinAndMax (fifo.data(), fftSize);
        // then render our FFT data..
        forwardFFT.performFrequencyOnlyForwardTransform (fftData.data());                   // [2]
        auto maxFFT = juce::FloatVectorOperations::findMinAndMax (fftData.data(), fftSize * 2);
        std::lock_guard<std::mutex> _(mtx);
        std::fill (std::begin(data_buffer), std::end(data_buffer), 0.0f);
        for(unsigned long y=0; y<fifo.size(); y++) {
            auto fft_level = juce::jmap(fftData[y], juce::jmin(FFT_MIN, maxFFT.getStart()), juce::jmax(FFT_MAX, maxFFT.getEnd()), 0.0f, 30.0f);
            auto volume_level = juce::jmap(std::fabs(fifo[y]), juce::jmin(VOL_MIN, maxVolume.getStart()) , juce::jmax(VOL_MAX, maxVolume.getEnd()), 0.0f, 10.0f);
            data_buffer[(int) std::round(fft_level)] = volume_level;
        }
    }

    static constexpr auto fftOrder = 10;                // [1]
    static constexpr auto fftSize  = 1 << fftOrder;     // [2]

private:
    juce::dsp::FFT forwardFFT;                          // [3]

    std::array<float, fftSize> fifo;                    // [4]
    std::array<float, fftSize * 2> fftData;             // [5]
    int fifoIndex = 0;                                  // [6]
    bool nextFFTBlockReady = false;                     // [7]

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (AudioLogic)
};

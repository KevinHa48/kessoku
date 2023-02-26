#include "MainComponent.h"

//==============================================================================
MainComponent::MainComponent() : juce::AudioAppComponent(otherDeviceManager)
{
    otherDeviceManager.initialise(2, 2, nullptr, true);
    audioSettings.reset(new juce::AudioDeviceSelectorComponent(otherDeviceManager, 0, 2, 0, 2, true, true, true, true));
    addAndMakeVisible(audioSettings.get());

    setAudioChannels(2, 2);
    setSize (500, 500);
}

//==============================================================================
void MainComponent::paint (juce::Graphics& g)
{
    // (Our component is opaque, so we must completely fill the background with a solid colour)
    g.fillAll (getLookAndFeel().findColour (juce::ResizableWindow::backgroundColourId));

    g.setFont (juce::Font (16.0f));
    g.setColour (juce::Colours::white);
    g.drawText ("Hello!", getLocalBounds(), juce::Justification::centred, true);
}

void MainComponent::releaseResources() {

}

void MainComponent::prepareToPlay(int samplesPerBlockExpected, double sampleRate) {

}

void MainComponent::getNextAudioBlock(const juce::AudioSourceChannelInfo &bufferToFill) {
   auto* device = deviceManager.getCurrentAudioDevice();
   auto activeInputChannels = device->getActiveInputChannels();
   auto activeOutputChannels = device->getActiveOutputChannels();

   // Calculate the number of channels we need to iterate through
   auto maxInputChannels  = activeInputChannels .getHighestBit() + 1;
   auto maxOutputChannels = activeOutputChannels.getHighestBit() + 1;

}

void MainComponent::resized()
{
    // This is called when the MainComponent is resized.
    // If you add any child components, this is where you should
    // update their positions.
    audioSettings->setBounds(10, 130, getWidth() - 20, 100);
}

#include "AudioLogic.h"
#include <thread>
#include <cstdlib>
#include <iostream>
#include <unordered_set>
#include <thread>

AudioLogic* logic;

class GuiAppApplication  : public juce::JUCEApplication
{
public:
    //==============================================================================
    GuiAppApplication() {}

    // We inject these as compile definitions from the CMakeLists.txt
    // If you've enabled the juce header with `juce_generate_juce_header(<thisTarget>)`
    // you could `#include <JuceHeader.h>` and use `ProjectInfo::projectName` etc. instead.
    const juce::String getApplicationName() override       { return JUCE_APPLICATION_NAME_STRING; }
    const juce::String getApplicationVersion() override    { return JUCE_APPLICATION_VERSION_STRING; }
    bool moreThanOneInstanceAllowed() override             { return true; }

    //==============================================================================
    void initialise (const juce::String&) override
    {
        //AudioLogic* logic;
        //logic = new AudioLogic();
        logic = new AudioLogic;
        mainWindow.reset (new MainWindow ("backend", logic, *this));
    }

    void shutdown() override
    {
        // Add your application's shutdown code here..

        mainWindow = nullptr; // (deletes our window)
    }

    //==============================================================================
    void systemRequestedQuit() override
    {
        // This is called when the app is being asked to quit: you can ignore this
        // request and let the app carry on running, or call quit() to allow the app to close.
        quit();
    }

    void anotherInstanceStarted (const juce::String& commandLine) override
    {
        // When another instance of the app is launched while this one is running,
        // this method is invoked, and the commandLine parameter tells you what
        // the other instance's command-line arguments were.
        juce::ignoreUnused (commandLine);
    }

private:
    class MainWindow    : public juce::DocumentWindow
    {
    public:
        MainWindow (const juce::String& name, juce::Component* c, JUCEApplication& a)
                : DocumentWindow (name, juce::Desktop::getInstance().getDefaultLookAndFeel()
                                          .findColour (ResizableWindow::backgroundColourId),
                                  juce::DocumentWindow::allButtons),
                  app (a)
        {
            setUsingNativeTitleBar (true);
            setContentOwned (c, true);

#if JUCE_ANDROID || JUCE_IOS
            setFullScreen (true);
#else
            setResizable (true, false);
            setResizeLimits (300, 250, 10000, 10000);
            centreWithSize (getWidth(), getHeight());
#endif

            setVisible (true);
        }

        void closeButtonPressed() override
        {
            app.systemRequestedQuit();
        }

    private:
        JUCEApplication& app;

        //==============================================================================
        JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (MainWindow)
    };

    std::unique_ptr<MainWindow> mainWindow;
};
START_JUCE_APPLICATION (GuiAppApplication);

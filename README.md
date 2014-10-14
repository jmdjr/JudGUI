JudGUI
======

a collection of UI Elements built on the CreateJS Framework <br/>
(link to example project below) <br/>
This project is my attempt at creating a collection of controls people can use when implementing thier own applications using 
the ever versital CreateJS suite!  

These controls are built around my custom framework which should simplify the process of creating interactive menus and applications, so that you can focus on building the fun stuff.

the framework is about... frames... YES, FRAMES! frames are to be thought of as the visible menu at that point in time. All the buttons, drop down menus and other controls belong in a frame. Frames have shortcut functions which allow you to add any one of the Data Editors with common properties, keeping things simple and clean looking.

the framework is not just about frames, its about... Collections of Frames! Frame Collections manage any number of frames, ensureing that only one frame is visible at a time, keeping the other frames in a paused state until they are needed. there are many functions that can be defined, or redefined which allow you to control exactly what happens before and after a frame comes forward, and even a function for what happens while the frame is active!

but these collections can be a bit bothersome, the framework manages with... the Frame System! the frame system manages frame collections, allowing for multiple frame collections to be rendered simultaneously, while they maintain their individual Frames. Frame Collections can be added to the Frame Engine on the fly, allowing you to construct complex multi-frame displays on demand!

Since this is all built on top of the CreateJS framework, anything you can create using EaselJS can be added to a frame easily! extending the frames allows you to customize how the frame works! want to customize how the frames transition between each other? want different transitions for each frame? want different looking frames? all can be done with a development style that feels a lot like basic web development; designing separate styles for elements for examples is extremely simple!

Hopefully it will continue working, but should be able to observe a demo of the site following this url: <br/><a href="http://rawgit.com/jmdjr/JudGUI/master/JudGUI/JudGUI/default.html" target="_blank">Example Project - customization of frames</a>

Major Updates:
10/14/2014... reworked readme to better point out the sample project. for those who are curious:
the sample project has a sidebar (consisting of a FrameCollection) and a main window (seperate FrameCollection)  all elements in the main window are moveable. clicking on an element will populate the sidebar with text boxes full of their properties.  dragging the element around will respond with updates in the coordinate fields.  clicking the "Button Sample" field will navigate to another Frame, which has a button that changes its colors randomly on click.  the sidebar text-fields will eventually be editable, but there is a bug in the synchronization which overwrites changes immidiately.  I know the "Text Example" button on the first frame does not work... I am getting ready for vacation soon and have been prioritizing my planned changes.

09/10/2014... Project is making real progress! I am working on an example project (which is kind of sloppy ATM) which will show off the major features of the system. it will be something akin to a WYSIWYG!  designing it this way, I will be able to show off how each DataEditorObject works, how the frames work in the frame collections, and how multiple frame collections work within the whole Frame System.  

07/21/2014... this project is currently being uploaded with my initial sloppy code I wrote, before I discovered
that other people were searching for controls.  I made a couple while implementing POC code to learn CreateJS.


I will update asap until its ready for others to work with.

#pragma once

#include "ofMain.h"
#include "ofxTurboJpeg.h"
#include "ofxLibwebsockets.h"

#define NUM_MESSAGES 20 // how many past messages we want to keep

class testApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();

		void keyPressed  (int key);
		void keyReleased(int key);
		void mouseMoved(int x, int y );
		void mouseDragged(int x, int y, int button);
		void mousePressed(int x, int y, int button);
		void mouseReleased(int x, int y, int button);
		void windowResized(int w, int h);
		void dragEvent(ofDragInfo dragInfo);
		void gotMessage(ofMessage msg);
		
        ofxLibwebsockets::Server server;
    
        //queue of rec'd messages
        ofTrueTypeFont font;
        vector<string> messages;
    
        string  toLoad;
        bool    bSendImage;
        ofImage currentImage;
        ofxTurboJpeg turbo;
    
        // websocket methods
        void onConnect( ofxLibwebsockets::Event& args );
        void onOpen( ofxLibwebsockets::Event& args );
        void onClose( ofxLibwebsockets::Event& args );
        void onIdle( ofxLibwebsockets::Event& args );
        void onMessage( ofxLibwebsockets::Event& args );
        void onBroadcast( ofxLibwebsockets::Event& args );
};

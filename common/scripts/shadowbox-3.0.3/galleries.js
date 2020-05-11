// This file is only required to run some of the demos.

function setupGalleries() {

    Shadowbox.setup("a.state-dinner-06", {
        gallery:        "stdinner",
        continuous:     true,
        counterType:    "skip"
    });
	
	Shadowbox.setup("a.photo-gallery", {
        gallery:        "photos",
        continuous:     true,
        counterType:    "skip"
    });
	
	Shadowbox.setup("a.swf-gallery", {
        gallery:    "swf",
        continuous: true
    });
}

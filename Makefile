SHELL := /bin/bash

SRC_RAW = ./res

SRC = ./src
BUILD_IMAGES = $(SRC)/assets/images/

BUILD = ./build


all: clean build
	cp -r $(SRC)/* $(BUILD)

images: clean_images
	$(foreach size, 16 48 72 96 144 168 192, \
		inkscape $(SRC_RAW)/icon.svg -w $(size) -h $(size) --export-png=$(BUILD_IMAGES)/icon_$(size).png ; \
	)

clean:
	rm -rf $(BUILD)/*

clean_images:
	rm -Rf $(BUILD_IMAGES)/*

deploy: all
	cp -r $(BUILD) /tmp
	git checkout gh-pages
	cp -r /tmp/$(BUILD)/* .
	git commit -am "Update"
	#git push

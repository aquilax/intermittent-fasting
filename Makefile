SHELL := /bin/bash

SRC_RAW = ./res

SRC = ./src
BUILD_IMAGES = $(SRC)/assets/images/

BUILD = ./build

COMMIT = $(shell git rev-parse --short HEAD)

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
	sed -i'' -e 's/XXXXXX/$(COMMIT)/g' $(BUILD)/assets/js/app.js
	#rm -rf ../intermittent-fasting.github.io/*
	cp -r $(BUILD)/* ../intermittent-fasting.github.io/
	pushd ../intermittent-fasting.github.io/
	git add .
	git commit -am "Update"
	git push
	popd

SHELL := /bin/bash

SRC_RAW = ./res
SRC = ./src
BUILD_IMAGES = $(SRC)/assets/images/

all:

images: clean_images
	$(foreach size, 48 72 96 144 168 192, \
		inkscape $(SRC_RAW)/icon.svg -w $(size) -h $(size) --export-png=$(BUILD_IMAGES)/icon_$(size).png ; \
	)

clean_images:
	rm -Rf $(BUILD_IMAGES)/*

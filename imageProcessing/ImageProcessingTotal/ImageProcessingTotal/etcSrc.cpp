#include "imageProcessing.hpp"

int grayAt(Mat img, int x, int y) {
	return img.at<uchar>(y, x);
}

int imgAt(Mat img, int x, int y, int c) {
	return img.at<Vec3b>(y, x)[c];
}

void setAt(Mat img, int x, int y, int c, int value) {
	if (value > 255) {
		img.at<Vec3b>(y, x)[c] = 255;
	}
	else if (value < 0) {
		img.at<Vec3b>(y, x)[c] = 0;
	}
	else {
		img.at<Vec3b>(y, x)[c] = value;
	}
}

int imgAtAlpha(Mat img, int x, int y, int c) {
	return img.at<Vec4b>(y, x)[c];
}


int isFileName(char* argv) {

	// file 이름이면 1, 거짓이면 0
	return 1;
}

void makeOutputFileName(char* inputFile, char* outFile) {
	outFile = (char*)malloc(sizeof(char) * FILE_NAME_MAX);
	// make file name..
}

int checkContrastOption(int argc, char* argv[]) {
	// if option has -c, return 1, else 0.
	for (int i = 0; i < argc; i++) {
		if (strcmp(argv[i], "-c") == 0) {
			return i;
		}
	}
	return -1;
}

int checkBlurOption(int argc, char* argv[]) {
	// if option has -b, return argc location, else -1.
	for (int i = 0; i < argc; i++) {
		if (strcmp(argv[i], "-b") == 0) {
			return i;
		}
	}
	return -1;
}

int checkMosiacOption(int argc, char* argv[]) {
	// if option has -m, return argc location, else -1
	for (int i = 0; i < argc; i++) {
		if (strcmp(argv[i], "-m") == 0) {
			return i;
		}
	}
	return -1;
}

int checkDeletionOption(int argc, char* argv[]) {
	// if option has -d, return argc location, else -1
	for (int i = 0; i < argc; i++) {
		if (strcmp(argv[i], "-d") == 0) {
			return i;
		}
	}
	return -1;
}

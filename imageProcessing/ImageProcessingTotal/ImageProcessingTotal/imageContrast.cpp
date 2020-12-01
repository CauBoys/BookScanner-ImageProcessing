#include "imageProcessing.hpp"

// Image Contrast Function implementation.

void contrast(Mat src, Mat dst, float alpha) {
	// src의 입력에서 alpha 만큼 강조하여 대비를 준다.
	Mat gray;
	cvtColor(src, gray, COLOR_BGR2GRAY);
	int height = gray.rows;
	int width = gray.cols;
	int histogram[MAX_GRAYSCALE_VALUE];

	// Init for histogram.
	for (int i = 0; i < MAX_GRAYSCALE_VALUE; i++) {
		histogram[i] = 0;
	}

	// Set histogram.
	makeGrayHistogram(gray, histogram, width, height);
	int midIndex = findMiddleValue(histogram, width * height);

	for (int x = 0; x < width; x++) {
		for (int y = 0; y < height; y++) {
			for (int c = 0; c < 3; c++) {
				// 만약 가운데 값보다 작다면 더 어둡게 만듬. 아니라면 더 밝게 만듬.
				if (grayAt(gray, x, y) < midIndex)
					setAt(dst, x, y, c, int(imgAt(src, x, y, c) * (1 / alpha)));
				else
					setAt(dst, x, y, c, int(imgAt(src, x, y, c) * alpha));
			}
		}
	}
}

void makeGrayHistogram(Mat grayImg, int* histogram, int width, int height) {
	for (int x = 0; x < width; x++) {
		for (int y = 0; y < height; y++) {
			histogram[grayAt(grayImg, x, y)]++;
		}
	}
}

int findMiddleValue(int* histogram, int maxPixel) {
	// Find Middle value of histogram variance.
	int index = 0;
	int addUp = histogram[index];

	while (addUp < int(maxPixel / 2)) {
		index++;
		if (index >= MAX_GRAYSCALE_VALUE) {
			// 255 만 있는 경우에는 가장 마지막 index를 return 해야함.
			index--;
			break;
		}
		addUp += histogram[index];
	}

	return index;
}

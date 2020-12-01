#include "imageProcessing.hpp"

// Image Contrast Function implementation.

void contrast(Mat src, Mat dst, float alpha) {
	// src�� �Է¿��� alpha ��ŭ �����Ͽ� ��� �ش�.
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
				// ���� ��� ������ �۴ٸ� �� ��Ӱ� ����. �ƴ϶�� �� ��� ����.
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
			// 255 �� �ִ� ��쿡�� ���� ������ index�� return �ؾ���.
			index--;
			break;
		}
		addUp += histogram[index];
	}

	return index;
}

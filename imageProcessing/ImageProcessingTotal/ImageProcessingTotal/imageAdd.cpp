#include "imageProcessing.hpp"

int imageAddTo(Mat img, Mat addImg, Mat dst, int x, int y) {
	// x, y 위치에다 addImg를 추가.
	int height = img.rows;
	int width = img.cols;

	int addHeight = addImg.rows;
	int addWidth = addImg.cols;

	if (x + addWidth > width) {
		return FAIL;
	}
	else if (y + addHeight > height) {
		return FAIL;
	}

	for (int w = 0; w < width; w++) {
		for (int h = 0; h < height; h++) {
			for (int c = 0; c < 3; c++) {
				setAt(dst, w, h, c, imgAt(img, w, h, c));
			}
		}
	}

	for (int w = x; w < x + addWidth; w++) {
		for (int h = y; h < y + addHeight; h++) {
			for (int c = 0; c < 3; c++) {
				if (imgAtAlpha(addImg, w - x, h - y, 3) != 0) {
					setAt(dst, w, h, c, imgAtAlpha(addImg, w - x, h - y, c));
				}
			}
		}
	}
	return SUCCESS;
}

int imageAddCenter(Mat img, Mat addImg, Mat dst) {
	// 가운데 위치에다 addImg를 추가.
	int height = img.rows;
	int width = img.cols;
	int addHeight = addImg.rows;
	int addWidth = addImg.cols;
	int x = int((width - addWidth) / 2);
	int y = int((height - addHeight) / 2);

	return imageAddTo(img, addImg, dst, x, y);
}
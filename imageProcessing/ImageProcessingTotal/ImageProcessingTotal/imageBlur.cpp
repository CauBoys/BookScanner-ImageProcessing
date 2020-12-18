#include "imageProcessing.hpp"

void add_up_image(Mat src, Mat dst, int startX, int startY, int endX, int endY) {
	// Add Up dst image`s start ~ end part into src.
	for (int x = startX; x < endX; x++) {
		for (int y = startY; y < endY; y++) {
			for (int c = 0; c < 3; c++) {
				setAt(src, x, y, c, imgAt(dst, x, y, c));
			}
		}
	}
}

void image_blur(Mat img, Mat dst, int startX, int startY, int endX, int endY, int windowX, int windowY) {
	int height = img.rows;
	int width = img.cols;
	int w, h, c;
	Vec3b aver;

	for (w = 0; w < width; w++) {
		for (h = 0; h < height; h++) {
			if (startX <= w && w < endX && startY <= h && h < endY) {
				aver = average(img, w, h, windowX, windowY);
				setAt(dst, w, h, 0, aver[0]);
				setAt(dst, w, h, 1, aver[1]);
				setAt(dst, w, h, 2, aver[2]);
			}
			else {
				setAt(dst, w, h, 0, imgAt(img, w, h, 0));
				setAt(dst, w, h, 1, imgAt(img, w, h, 1));
				setAt(dst, w, h, 2, imgAt(img, w, h, 2));
			}
		}
	}

}
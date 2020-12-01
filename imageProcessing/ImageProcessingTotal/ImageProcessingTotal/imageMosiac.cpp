#include "imageProcessing.hpp"


void image_mosiac(Mat img, Mat dst, int startX, int startY, int endX, int endY, int windowX, int windowY) {
	int height = img.rows;
	int width = img.cols;
	int w, h, tempW, tempH;
	Vec3b aver;

	for (w = 0; w < width; w++) {
		for (h = 0; h < height; h++) {
			setAt(dst, w, h, 0, imgAt(img, w, h, 0));
			setAt(dst, w, h, 1, imgAt(img, w, h, 1));
			setAt(dst, w, h, 2, imgAt(img, w, h, 2));
		}
	}

	for (w = startX; w < endX; w += windowX) {
		for (h = startY; h < endY; h += windowY) {
			aver = average(img, w, h, windowX, windowY);
			for (tempW = w; tempW < endX && tempW < w + windowX; tempW++) {
				for (tempH = h; tempH < endY && tempH < h + windowY; tempH++) {
					setAt(dst, tempW, tempH, 0, aver[0]);
					setAt(dst, tempW, tempH, 1, aver[1]);
					setAt(dst, tempW, tempH, 2, aver[2]);
				}
			}
		}
	}

}

Vec3b average(Mat img, int x, int y, int windowX, int windowY) {
	int height = img.rows;
	int width = img.cols;
	int totalPixel = windowX * windowY;
	int totalR = 0;
	int totalG = 0;
	int totalB = 0;
	int w, h;

	for (w = 0; w < windowX; w++) {
		for (h = 0; h < windowY; h++) {
			if (check_coord_available(width, height, x + w, y + h)) {
				totalR += imgAt(img, x + w, y + h, 0);
				totalG += imgAt(img, x + w, y + h, 1);
				totalB += imgAt(img, x + w, y + h, 2);
			}
			else {
				totalPixel--;
			}
		}
	}

	return Vec3b(int(totalR / totalPixel), int(totalG / totalPixel), int(totalB / totalPixel));
}
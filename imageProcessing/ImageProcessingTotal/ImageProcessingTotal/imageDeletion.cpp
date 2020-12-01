#include "imageProcessing.hpp"



int check_coord_available(int width, int height, int x, int y) {
	return x >= 0 && x < width&& y >= 0 && y < height;
}

void image_deleteion(Mat img, Mat dst, int startX, int startY, int endX, int endY, int backX, int backY) {
	int height = img.rows;
	int width = img.cols;
	int w, h, c;

	for (w = 0; w < width; w++) {
		for (h = 0; h < height; h++) {
			for (c = 0; c < 3; c++) {
				if (startX <= w && w < endX && startY <= h && h < endY) {
					setAt(dst, w, h, c, imgAt(img, backX, backY, c));
				}
				else {
					setAt(dst, w, h, c, imgAt(img, w, h, c));
				}
			}
		}
	}

}
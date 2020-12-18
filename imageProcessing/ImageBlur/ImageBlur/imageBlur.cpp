#include <opencv2/opencv.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <vector>
#include <iostream>

#define WINDOW_SIZE 2

using namespace cv;
using namespace std;

int check_coord_available(int width, int height, int x, int y);
Vec3b average(Mat img, int x, int y, int windowX, int windowY);
void add_up_image(Mat src, Mat dst, int startX, int startY, int endX, int endY);
void image_blur(Mat img, Mat dst, int startX, int startY, int endX, int endY, int windowX, int windowY);
void setAt(Mat img, int x, int y, int c, int value);
int imgAt(Mat img, int x, int y, int c);

int main(int argc, char* argv[]) {
	if (argc != 8) {
		printf("argv do not match...\n");
		return 0;
	}

	char* inputFile = argv[1];
	char* saveFile = argv[2];

	int startX = atoi(argv[3]);
	int startY = atoi(argv[4]);
	int endX = atoi(argv[5]);
	int endY = atoi(argv[6]);
	int value = atoi(argv[7]);
	int windowX = WINDOW_SIZE * value;
	int windowY = WINDOW_SIZE * value;

	Mat img = imread(inputFile, IMREAD_COLOR);
	int height = img.rows;
	int width = img.cols;

	if (!check_coord_available(width, height, startX, startY)) {
		printf("start coord error...\n");
		return 0;
	}

	if (!check_coord_available(width, height, endX, endY)) {
		printf("end coord error...\n");
		return 0;
	}

	Mat blurImage;

	blur(img, blurImage, Size(windowX, windowY), Point(-1, -1));
	add_up_image(img, blurImage, startX, startY, endX, endY);

	imwrite(saveFile, img);

	return 0;
}

int check_coord_available(int width, int height, int x, int y) {
	return x >= 0 && x < width&& y >= 0 && y < height;
}

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
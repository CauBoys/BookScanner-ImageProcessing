#include <opencv2/opencv.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <vector>
#include <iostream>

using namespace cv;
using namespace std;

int check_coord_available(int width, int height, int x, int y);
void image_deleteion(Mat img, Mat dst, int startX, int startY, int endX, int endY, int backX, int backY);
void setAt(Mat img, int x, int y, int c, int value);
int imgAt(Mat img, int x, int y, int c);

int main(int argc, char* argv[]) {
	if (argc != 9) {
		printf("argv do not match...\n");
		return 0;
	}

	char* inputFile = argv[1];
	char* saveFile = argv[2];

	int startX = atoi(argv[3]);
	int startY = atoi(argv[4]);
	int endX = atoi(argv[5]);
	int endY = atoi(argv[6]);
	int backX = atoi(argv[7]);
	int backY = atoi(argv[8]);
	
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

	if (!check_coord_available(width, height, backX, backY)) {
		printf("back coord error...\n");
		return 0;
	}
	

	Mat dst = Mat::zeros(height, width, CV_8UC3);

	image_deleteion(img, dst, startX, startY, endX, endY, backX, backY);
	imwrite(saveFile, dst);

	return 0;
}


int check_coord_available(int width, int height, int x, int y) {
	return x >= 0 && x < width && y >= 0 && y < height;
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
#include <opencv2/opencv.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <vector>
#include <iostream>
#define FAIL -1
#define SUCCESS 0
#define DIV_NUM 4.5

using namespace cv;
using namespace std;

int imageAddTo(Mat img, Mat addImg, Mat dst, int x, int y);
int imageAddCenter(Mat img, Mat addImg, Mat dst);
int imgAt(Mat img, int x, int y, int c);
int imgAtAlpha(Mat img, int x, int y, int c);
void setAt(Mat img, int x, int y, int c, int value);

int main(int argc, char * argv[]) {
	if (argc != 3) {
		printf("args not profit.\n");
		return 0;
	}

	char* inputFile = argv[1];
	char* saveFile = argv[2];

	Mat img = imread(inputFile, IMREAD_COLOR);
	Mat addImg = imread("./runner/cowboys.png", IMREAD_UNCHANGED);	// Alpha Value Image need to read with IMREAD_UNCHANGED.
	int height = img.rows;
	int width = img.cols;
	Mat dst = Mat::zeros(height, width, CV_8UC3);

	imageAddTo(img, addImg, dst, width - addImg.cols - 40, height - addImg.rows - 40);
	imwrite(saveFile, dst);

	return 0;
}

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

int imgAt(Mat img, int x, int y, int c) {
	return img.at<Vec3b>(y, x)[c];
}

int imgAtAlpha(Mat img, int x, int y, int c) {
	return img.at<Vec4b>(y, x)[c];
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
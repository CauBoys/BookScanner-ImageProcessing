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

int main() {
	Mat img = imread("imgex.jpg", IMREAD_COLOR);
	Mat addImg = imread("cowboys.png", IMREAD_UNCHANGED);	// Alpha Value Image need to read with IMREAD_UNCHANGED.
	int height = img.rows;
	int width = img.cols;
	Mat dst = Mat::zeros(int(height / DIV_NUM), int(width / DIV_NUM), CV_8UC3);
	Mat resizedImg;

	resize(img, resizedImg, Size(int(width / DIV_NUM), int(height / DIV_NUM)), 0, 0, INTER_LINEAR);

	imageAddCenter(resizedImg, addImg, dst);

	
	imshow("���� ����", dst);
	waitKey();
	return 0;
}

int imageAddTo(Mat img, Mat addImg, Mat dst, int x, int y) {
	// x, y ��ġ���� addImg�� �߰�.
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
	// ��� ��ġ���� addImg�� �߰�.
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
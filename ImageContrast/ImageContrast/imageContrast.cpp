#include <opencv2/opencv.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <vector>
#include <iostream>

#define DIV_NUM 4.5

using namespace cv;
using namespace std;

int grayAt(Mat img, int x, int y);
void contrast(Mat src, Mat dst, float alpha);

int main(void) {
	Mat img = imread("imgex.jpg", IMREAD_COLOR);
	Mat dst;

	int height = img.size().height;
	int width = img.size().width;

	Mat img_higher_contrast;
	contrast(img, img_higher_contrast, 1.5);
	// equalizeHist(img, img_higher_contrast);
	//img.convertTo(img_higher_contrast, -1, 1.5, 0);

	// resize(img_higher_contrast, dst, Size(int(width / DIV_NUM), int(height / DIV_NUM)), 0, 0, INTER_LINEAR);
	// imshow("예시 파일", dst);	
	waitKey();
	return 0;
}

void contrast(Mat src, Mat dst, float alpha) {
	// src의 입력에서 alpha 만큼 강조하여 대비를 준다.
	Mat gray;
	cvtColor(src, gray, COLOR_BGR2GRAY);
	vector<int> histogram;
	int height = gray.size().height;
	int width = gray.size().width;
	int x, y;

	for (y = 0; y < height; y++) {
		for (x = 0; x < width; x++) {
			histogram.push_back(grayAt(gray, x, y));
		}
	}
	printf("%d\n", gray.at<Vec2b>(20, 20)[0]); // y, x
}

int grayAt(Mat img, int x, int y) {
	return img.at<Vec2b>(y, x)[0];
}

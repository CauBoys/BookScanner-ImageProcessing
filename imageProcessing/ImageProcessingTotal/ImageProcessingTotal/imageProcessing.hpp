#pragma once
#include "opencv2/opencv.hpp"
#include "opencv2/highgui.hpp"
#include "opencv2/imgproc.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/types_c.h"
#include "opencv2/imgproc/imgproc_c.h"
#include <vector>
#include <iostream>
#include <cstring>
#include <cstdlib>

#define DIV_NUM 4.5
#define MAX_GRAYSCALE_VALUE 256
#define MULTI_VALUE 0.003
#define FAIL -1
#define SUCCESS 0
#define DIV_NUM 4.5
#define WINDOW_SIZE 2
#define FILE_NAME_MAX 128


const int max_lowThreshold = 100;
const int ratio = 3;
const int kernel_size = 3;

using namespace cv;
using namespace std;

// Image Processing Functions.
void contrast(Mat src, Mat dst, float alpha);

// Contrast 
int findMiddleValue(int* histogram, int maxPixel);
void makeGrayHistogram(Mat grayImg, int* histogram, int width, int height);

// Picture Extraction
void showPictures(Mat img, string saveFile);

// Paper Scaling
Mat arrange_image(Mat image);

// Image Add
int imageAddTo(Mat img, Mat addImg, Mat dst, int x, int y);
int imageAddCenter(Mat img, Mat addImg, Mat dst);

// Image Deletion
void image_deleteion(Mat img, Mat dst, int startX, int startY, int endX, int endY, int backX, int backY);

// Image Mosiac
Vec3b average(Mat img, int x, int y, int windowX, int windowY);
void image_mosiac(Mat img, Mat dst, int startX, int startY, int endX, int endY, int windowX, int windowY);

// Image Blur
void add_up_image(Mat src, Mat dst, int startX, int startY, int endX, int endY);
void image_blur(Mat img, Mat dst, int startX, int startY, int endX, int endY, int windowX, int windowY);

// Etc Functions
double angle(cv::Point pt1, cv::Point pt2, cv::Point pt0);
Mat rotate(Mat img, vector<Point> not_a_rect_shape);

int check_coord_available(int width, int height, int x, int y);
int grayAt(Mat img, int x, int y);
int imgAt(Mat img, int x, int y, int c);
int imgAtAlpha(Mat img, int x, int y, int c);
void setAt(Mat img, int x, int y, int c, int value);
void printHelp();

string makeOutputFileName(string image);
int checkContrastOption(int argc, char* argv[]);
int checkBlurOption(int argc, char* argv[]);
int checkMosiacOption(int argc, char* argv[]);
int checkDeletionOption(int argc, char* argv[]);
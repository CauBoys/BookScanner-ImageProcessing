#include "imageProcessing.hpp"

double angle(cv::Point pt1, cv::Point pt2, cv::Point pt0) {
    double dx1 = pt1.x - pt0.x;
    double dy1 = pt1.y - pt0.y;
    double dx2 = pt2.x - pt0.x;
    double dy2 = pt2.y - pt0.y;
    return (dx1 * dx2 + dy1 * dy2) / sqrt((dx1 * dx1 + dy1 * dy1) * (dx2 * dx2 + dy2 * dy2) + 1e-10);
}

void showPictures(Mat img, string saveFile) {
    Mat src_gray, canny_output;
    RNG rng(12345);
    vector<Vec4i> hierarchy;
    vector<vector<Point> > contours;
    int thresh = 100;

    /// Convert image to gray and blur it
    cvtColor(img, src_gray, CV_BGR2GRAY);
    blur(src_gray, src_gray, Size(3, 3));
    erode(src_gray, src_gray, Mat());

    // Find contours and store them in a list
    Canny(src_gray, canny_output, thresh, thresh * 2, 3);
    findContours(canny_output, contours, CV_RETR_LIST, CV_CHAIN_APPROX_SIMPLE);

    Mat mask = Mat::zeros(src_gray.rows, src_gray.cols, CV_8UC1);
    for (size_t i = 0; i < contours.size(); i++)
    {
        Rect rect = boundingRect(contours[i]);
        if (rect.width > img.rows / 20 & rect.height > img.cols / 20) {
            rectangle(mask, rect, Scalar(100, 100, 100), -1);
        }
    }
    findContours(mask, contours, CV_RETR_LIST, CV_CHAIN_APPROX_SIMPLE);

    /// Draw contours
    Mat drawing = Mat::zeros(img.size(), CV_8UC3);

    for (int i = 0; i < contours.size(); i++)
    {
        string loc = saveFile + "_" + to_string(i) + ".jpg";
        Mat crop = img(boundingRect(cv::Mat(contours[i])));
        imwrite(loc, crop);
        std::cout << loc << std::endl;
    }

}
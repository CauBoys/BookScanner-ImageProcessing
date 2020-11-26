#include "opencv2/imgproc.hpp"
#include "opencv2/highgui.hpp"
#include <opencv2/imgproc/types_c.h>
#include <opencv2/imgproc/imgproc_c.h>
#include <iostream>
using namespace std;
using namespace cv;
Mat src, src_gray;
Mat dst, detected_edges;
int lowThreshold = 0;
const int max_lowThreshold = 100;
const int ratio = 3;
const int kernel_size = 3;
const char* window_name = "Edge Map";
string file_name = "good_11111";

void show(Mat image) {
    namedWindow(window_name, WINDOW_NORMAL);
    imshow(window_name, image);
    waitKey(0);
}


double angle(cv::Point pt1, cv::Point pt2, cv::Point pt0) {
    double dx1 = pt1.x - pt0.x;
    double dy1 = pt1.y - pt0.y;
    double dx2 = pt2.x - pt0.x;
    double dy2 = pt2.y - pt0.y;
    return (dx1 * dx2 + dy1 * dy2) / sqrt((dx1 * dx1 + dy1 * dy1) * (dx2 * dx2 + dy2 * dy2) + 1e-10);
}

void showPictures(Mat img) {
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
        string loc = "output/" + file_name + "_" + to_string(i);
        loc = loc + ".jpg";
        Mat crop = img(boundingRect(cv::Mat(contours[i])));
        imwrite(loc, crop);

        Scalar color = Scalar(255, 0, 0);
        drawContours(drawing, contours, i, color, 2, 8, hierarchy, 0, Point());
    }

}

Mat rotate(vector<Point> not_a_rect_shape) {

    // Assemble a rotated rectangle out of that info
    RotatedRect box = minAreaRect(cv::Mat(not_a_rect_shape));
    Point2f pts[4];

    box.points(pts);

    cv::Point2f src_vertices[4];
    src_vertices[0] = not_a_rect_shape[3];
    src_vertices[1] = not_a_rect_shape[0];
    src_vertices[2] = not_a_rect_shape[2];
    src_vertices[3] = not_a_rect_shape[1];

    Point2f dst_vertices[4];
    dst_vertices[0] = Point(0, 0);
    dst_vertices[1] = Point(box.boundingRect().width - 1, 0);
    dst_vertices[2] = Point(0, box.boundingRect().height - 1);
    dst_vertices[3] = Point(box.boundingRect().width - 1, box.boundingRect().height - 1);

    Mat warpAffineMatrix = getAffineTransform(src_vertices, dst_vertices);

    cv::Mat rotated;
    cv::Size size(box.boundingRect().width, box.boundingRect().height);
    warpAffine(src, rotated, warpAffineMatrix, size, INTER_LINEAR, BORDER_CONSTANT);

    return rotated;
}

Mat arrange_image(Mat image)
{
    vector<vector<Point> > squares;

    // blur will enhance edge detection

    Mat dst = image.clone();
    Mat blurred(dst);
    medianBlur(dst, blurred, 9);

    Mat gray0(blurred.size(), CV_8U), gray;
    vector<vector<Point> > contours;

    // find squares in every color plane of the image
    for (int c = 0; c < 3; c++)
    {
        int ch[] = { c, 0 };
        mixChannels(&blurred, 1, &gray0, 1, ch, 1);

        // try several threshold levels
        const int threshold_level = 2;
        for (int l = 0; l < threshold_level; l++)
        {
            // Use Canny instead of zero threshold level!
            // Canny helps to catch squares with gradient shading
            if (l == 0)
            {
                Canny(gray0, gray, 10, 20, 3); // 

                // Dilate helps to remove potential holes between edge segments
                dilate(gray, gray, Mat(), Point(-1, -1));
            }
            else
            {
                gray = gray0 >= (l + 1) * 255 / threshold_level;
            }

            // Find contours and store them in a list
            findContours(gray, contours, CV_RETR_LIST, CV_CHAIN_APPROX_SIMPLE);
            // Test contours
            vector<Point> approx;
            for (size_t i = 0; i < contours.size(); i++)
            {
                // approximate contour with accuracy proportional
                // to the contour perimeter
                approxPolyDP(Mat(contours[i]), approx, arcLength(Mat(contours[i]), true) * 0.02, true);

                // Note: absolute value of an area is used because
                // area may be positive or negative - in accordance with the
                // contour orientation
                if (approx.size() == 4 &&
                    fabs(contourArea(Mat(approx))) > image.rows * image.cols / 4 &&
                    isContourConvex(Mat(approx)))
                {
                    double maxCosine = 0;

                    for (int j = 2; j < 5; j++)
                    {
                        double cosine = fabs(angle(approx[j % 4], approx[j - 2], approx[j - 1]));
                        maxCosine = MAX(maxCosine, cosine);
                    }
                    if (maxCosine < 0.3)
                        squares.push_back(approx);
                }
            }
        }
    }
    int i = 0;
    if (squares.size() > 0) {
        //it generally works without below for... if it doesn't work well for some image, than I'll check out.
        //for (int i = 0; i < squares.size(); i++) {
        // draw contour
        cv::drawContours(image, squares, i, cv::Scalar(255, 0, 0), 5, 8, std::vector<cv::Vec4i>(), 0, cv::Point()); // blue
        // draw bounding rect
        cv::Rect rect = boundingRect(cv::Mat(squares[i]));
        cv::rectangle(image, rect.tl(), rect.br(), cv::Scalar(0, 255, 0), 2, 8, 0); // green

        // draw rotated rect
        cv::RotatedRect minRect = minAreaRect(cv::Mat(squares[i]));
        cv::Point2f rect_points[4];
        minRect.points(rect_points);
        for (int j = 0; j < 4; j++) {
            cv::line(image, rect_points[j], rect_points[(j + 1) % 4], cv::Scalar(0, 0, 255), 1, 8); // red
        }
        return rotate(squares[i]);
    }
    return image;
}

int main(int argc, char** argv)
{
    CommandLineParser parser(argc, argv, "{@input | " + file_name + ".jpg | input image}");
    src = imread(samples::findFile(parser.get<String>("@input")), IMREAD_COLOR); // Load an image
    if (src.empty())
    {
        std::cout << "Could not open or find the image!\n" << std::endl;
        std::cout << "Usage: " << argv[0] << " <Input image>" << std::endl;
        return -1;
    }
    Mat dst = src.clone();
    Mat square_img = arrange_image(dst);
    showPictures(square_img);

    return 0;
}
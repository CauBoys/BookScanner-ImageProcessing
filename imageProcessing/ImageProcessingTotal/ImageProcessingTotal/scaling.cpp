#include "imageProcessing.hpp"

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

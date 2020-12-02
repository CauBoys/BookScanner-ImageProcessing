#include "imageProcessing.hpp"

// Global Variable
Mat src, src_gray;
Mat dst, detected_edges;
int lowThreshold = 0;


int main(int argc, char* argv[]) {
	if (strcmp(argv[1], "-h") == 0) {
		printHelp();
		return 0;
	}

	string image(argv[1]);//image.jpg
	if (strcmp(argv[1], "-e") == 0) {
		image = "sample(1).jpg";
	}
	string inputFile = "input/" + image;
	string saveFile1 = makeOutputFileName(image);
	string saveFile2 = saveFile1 + "_output.jpg";

	src = imread(inputFile, IMREAD_COLOR); // Load an image

	if (src.empty()) {
		printf("Could not open or find the image!\n");
		return -1;
	}

	Mat input = src.clone();
	Mat dst;	// dst will be final saved file.

	// Image Contrast Part
	int contrastLoc = checkContrastOption(argc, argv);
	int value;
	if (contrastLoc > 0) {
		if (contrastLoc + 1 >= argc) {
			printf("Contrast value need to followed.\n");
			printf("Usage : imageProcessing ${INPUT_FILE} -c ${INT_VALUE}\n");
			return -1;
		}
		value = atoi(argv[contrastLoc + 1]);
		if (value < 0 || value > 100) {
			printf("Contrast value need to be 0 ~ 100 value.\n");
			return -1;
		}
		dst = Mat::zeros(getHeight(src), getWidth(src), CV_8UC3);
		contrast(input, dst, 1 + MULTI_VALUE * value);
		input = dst.clone();	// Save at scaling Image with contrast changed version.
	}
	dst = arrange_image(input);	// Scaling Image
	input = dst.clone();
	showPictures(input, saveFile1); // Picture Extraction Part.

	// Image Deletion Part
	int deletionLoc = checkDeletionOption(argc, argv); 
	int startX, startY, endX, endY;

	if (deletionLoc > 0) {
		startX = atoi(argv[deletionLoc + 1]);
		startY = atoi(argv[deletionLoc + 2]);
		endX = atoi(argv[deletionLoc + 3]);
		endY = atoi(argv[deletionLoc + 4]);
		int backX = atoi(argv[deletionLoc + 5]);
		int backY = atoi(argv[deletionLoc + 6]);

		if (!check_coord_available(getWidth(input), getHeight(input), startX, startY)) {
			printf("start coord error...\n");
			printf("Please input coord width : %d to %d and height %d to %d.\n", 0, getWidth(input), 0, getHeight(input));
			return -1;
		}

		if (!check_coord_available(getWidth(input), getHeight(input), endX, endY)) {
			printf("end coord error...\n");
			printf("Please input coord width : %d to %d and height %d to %d.\n", 0, getWidth(input), 0, getHeight(input));
			return -1;
		}

		if (!check_coord_available(getWidth(input), getHeight(input), backX, backY)) {
			printf("back coord error...\n");
			printf("Please input coord width : %d to %d and height %d to %d.\n", 0, getWidth(input), 0, getHeight(input));
			return -1;
		}
		dst = Mat::zeros(getHeight(input), getWidth(input), CV_8UC3);
		image_deleteion(input, dst, startX, startY, endX, endY, backX, backY);
		input = dst.clone();	// Save at scaling Image with deleted version.
	}

	// Image mosiac
	int mosiacLoc = checkMosiacOption(argc, argv);
	int windowX, windowY;
	if (mosiacLoc > 0) {
		startX = atoi(argv[mosiacLoc + 1]);
		startY = atoi(argv[mosiacLoc + 2]);
		endX = atoi(argv[mosiacLoc + 3]);
		endY = atoi(argv[mosiacLoc + 4]);
		value = atoi(argv[mosiacLoc + 4]);
		if (!check_coord_available(getWidth(input), getHeight(input), startX, startY)) {
			printf("start coord error...\n");
			return 0;
		}

		if (!check_coord_available(getWidth(input), getHeight(input), endX, endY)) {
			printf("end coord error...\n");
			return 0;
		}
		windowX = WINDOW_SIZE * value;
		windowY = WINDOW_SIZE * value;
		dst = Mat::zeros(getHeight(input), getWidth(input), CV_8UC3);

		image_mosiac(input, dst, startX, startY, endX, endY, windowX, windowY);
		input = dst.clone();	// Save at scaling Image with deleted version.
	}

	// Image Blur
	int blurLoc = checkBlurOption(argc, argv);
	if (blurLoc > 0) {
		startX = atoi(argv[blurLoc + 1]);
		startY = atoi(argv[blurLoc + 2]);
		endX = atoi(argv[blurLoc + 3]);
		endY = atoi(argv[blurLoc + 4]);
		value = atoi(argv[blurLoc + 4]);
		if (!check_coord_available(getWidth(input), getHeight(input), startX, startY)) {
			printf("start coord error...\n");
			return 0;
		}

		if (!check_coord_available(getWidth(input), getHeight(input), endX, endY)) {
			printf("end coord error...\n");
			return 0;
		}
		windowX = WINDOW_SIZE * value;
		windowY = WINDOW_SIZE * value;
		blur(input, dst, Size(windowX, windowY), Point(-1, -1));
		input = dst.clone();
		add_up_image(input, dst, startX, startY, endX, endY);	// Add up blurring part at original pictures.
		input = dst.clone();
	}	

	// Image Add Part
	Mat addImg = imread("input/logo.png", IMREAD_UNCHANGED);	// Alpha Value Image need to read with IMREAD_UNCHANGED.
	if (addImg.empty()) {
		printf("Could not open or find the logo!\n");
	} else {
		dst = Mat::zeros(getHeight(input), getWidth(input), CV_8UC3);
		imageAddTo(input, addImg, dst, getWidth(input) - addImg.cols - 40, getHeight(input) - addImg.rows - 40);
	}
	imwrite(saveFile2, dst);
	return 0;
}

void printHelp() {
	printf("DIP Team assignment 2 Program.\n");
	printf("This program extract paper from given images, and extract images in paper. ");
	printf("Also, this program can change image contrast, blur, mosiac, and deletion.\n");
	printf("First, we extract paper from image.\n");
	printf("Second, we extract images from extracted paper.\n");
	printf("Third, we adjust extracted paper images sequence of contrast, blur, mosiac, deletion.\n");
	printf("Belows are this program`s parameter.\n\n");
	printf("Help.\n");
	printf("imageProcessing -h");
	printf("Example.\n");
	printf("imageProcessing -e ${INPUT_FILE}");
	printf("imageProcessing ${INPUT_FILE} ${OUTPUT_FILE}\n");
	printf("If output file is not specificated, we will auto generate output files. Next options are optionable functions.\n");
	printf("Contrast can be used like below.\n");
	printf("-c ${VALUE}\n");
	printf("Blur can be used like below.\n");
	printf("-b ${START_X} ${START_Y} ${END_X} ${END_Y} ${VALUE}\n");
	printf("Mosiac can be used like below.\n");
	printf("-m ${START_X} ${START_Y} ${END_X} ${END_Y}\n");
	printf("Deletion can be used like below.\n");
	printf("-d ${START_X} ${START_Y} ${END_X} ${END_Y} ${BACKGROUND_X} ${BACKGROUND_Y}\n");
}

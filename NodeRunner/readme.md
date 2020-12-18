base_url : localhost:$(PORT)

### post base_url/ip/cut
이미지에서 종이 찾는 함수
요청 인자
img : 이미지 파일 내용

성공시 return
{
   result: true,
   fileName: String FileName
}
실패시 return
{   
   result: false
}

### post base_url/ip/contast
이미지에서 사진 찾는 함수
요청 인자
img : 이미지 파일 내용,
value: 0 ~ 100 int 값

성공시 return
{
   result: true,
   fileName: String FileName
}
실패시 return
{   
   result: false
}

### post base_url/ip/add
이미지에 Watermark 추가하는 함수
요청 인자
img : 이미지 파일 내용,
value: 0 ~ 100 int 값

성공시 return
{
   result: true,
   fileName: String FileName
}
실패시 return
{   
   result: false
}


### post base_url/ip/deletion
이미지 특정 부분을 특정 색으로 채우는 함수

요청 인자
img: fileName
startX: int x
startY: int y
endX: int x
endY: int y
backX: int x
backY: int y

성공시 return
{
   result: true,
   fileName: String FileName
}
실패시 return
{   
   result: false
}

### post base_url/ip/blur
!! 지금 네모 크기 500 x 500 이상에 value 15 넘어가면 엄청 늦어지니 조심!
이미지 Blur

요청 인자
img: fileName
startX: int x
startY: int y
endX: int x
endY: int y
value: 0 ~ 100 int 값

성공시 return
{
   result: true,
   fileName: String FileName
}
실패시 return
{   
   result: false
}

### post base_url/ip/mosiac
이미지 모자이크

요청 인자
img: fileName
startX: int x
startY: int y
endX: int x
endY: int y
value: 0 ~ 100 int 값

성공시 return
{
   result: true,
   fileName: String FileName
}
실패시 return
{   
   result: false
}


### post base_url/ip/find
잘라낸 종이에서 사진을 찾는 함수
요청 인자
img: 이미지 파일 내용

성공시 return
{
   result: true
   fileName: array [String fileNames]
}
실패시 return
{
   result: false
}


### get base_url/file/download/f2ac-sdda-
해당 변형된 파일 다운로드 ( uuid )


### post base_url/ip/cutAndFind
요청 인자
img: 이미지 파일 내용
성공시
{
    result: true,
    cutFileName: uuid,
    subFileName: array [String fileNames]
}
실패시
{
    result: false
}

### post base_url/ip/cutAndAdd
요청 인자
img: 이미지 파일 내용
성공시
{
    result: true,
    cutFileName: uuid,
    subFileName: array [String fileNames]
}
실패시
{
    result: false
}
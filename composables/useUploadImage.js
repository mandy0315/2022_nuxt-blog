const api = {
  storage: '/api/image/pictureToStorage',
  imgur: '/api/image/pictureToImgur'
};
export default function () {
  const errorMsg = ref('');

  const getUploadImageInfo = ({ image, url, imageList }) => {
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async e => {
      let base64Img = e.target.result;
      base64Img = base64Img.replace(`data:${image.type};base64,`, '');

      let form = new FormData();
      form.append('file', image);
      form.append('base64Img', base64Img);

      const { data, error } = await useFetch(`${url}?album=post`, {
        method: 'POST',
        body: form
      });

      if (data.value) {
        const obj = {
          link: data.value?.result?.link || '',
          name: data.value?.result?.name || '',
          size: data.value?.result?.size || ''
        };
        imageList.push(obj);
      } else {
        errorMsg.value = error._value.data.data?.error;
      }
    };
  };
  const clickUploadImages = ({ event, imageList, uploadPlace = 'imgur' }) => {
    errorMsg.value = '';
    const files = event.target.files;

    // 上傳圖片
    for (let file of files) {
      getUploadImageInfo({ image: file, imageList: imageList, url: api[uploadPlace] });
    }
  };

  const removeCurrImage = (idx, imgList) => {
    imgList.splice(idx, 1);
  };
  return {
    clickUploadImages,
    errorMsg,
    removeCurrImage
  };
}

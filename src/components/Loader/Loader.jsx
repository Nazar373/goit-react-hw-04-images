import { Audio } from 'react-loader-spinner';
export default function Loader({isLoading}) {
  return (
    <Audio
      height="80"
      width="80"
      radius="9"
      color="green"
      ariaLabel="loading"
      wrapperStyle={{color:"red", height:80 , width:80}}
      visible={isLoading}
      // wrapperClass
    />
  );
}

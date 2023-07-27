import Image from "next/image";

interface ProcessingProps {
  uploadProcessing: boolean;
  createProcessing: boolean;
}

interface ModalDrops {
  name: string;
  symbol: string;
  processing?: ProcessingProps;
  onClose: (onClose: boolean) => void;
}

function ModalCreate(props: ModalDrops) {
  const { name, symbol, processing, onClose } = props;
  return (
    <div className="create__modal">
      <div className="modal--collection">
        <Image src={"/images/bg-gradient.jpg"} alt="" width={80} height={80} />
        <div>
          <p>Display Name: {name}</p>
          <p>Symbol: {symbol}</p>
        </div>
      </div>
      <div className="modal--item">
        <div>
          {processing?.uploadProcessing ? (
            <div className="check"></div>
          ) : (
            <div className="loading"></div>
          )}
        </div>
        <p>Upload Nfts</p>
      </div>
      <div className="modal--item">
        <div>
          {processing?.createProcessing ? (
            <div className="check"></div>
          ) : (
            <div className="loading"></div>
          )}
        </div>
        <p>Create Collection</p>
      </div>
      {processing?.createProcessing && processing?.uploadProcessing && (
        <button className="btn" onClick={() => onClose(false)}>
          Cancel
        </button>
      )}
    </div>
  );
}

export default ModalCreate;

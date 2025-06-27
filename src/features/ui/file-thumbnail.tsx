import { Button } from "./button";
import { FileText, Trash2 } from 'lucide-react'

export const FileThumbnail = (props: {
  filename: string
  handleClear?: () => void
}) => {
  const {filename, handleClear} = props;
  
  const splitName = filename.split('.')
  const getFileExt = (): string | undefined => splitName?.pop()?.toUpperCase();
  const getFileName = () => splitName?.shift() || filename;

  return (
    <div className={handleClear ? 'flex': 'mb-4'}>
      <div className={`bg-background border p-3 rounded-md text-sm font-medium m-1 relative${handleClear ? ' pr-12' : ''}`}>
        {handleClear && <Button size="icon" variant={"ghost"} onClick={handleClear} type="button" aria-label="Clear File" className='absolute right-0 top-0'>
          <Trash2 size={14} />
        </Button>}
        <div className='mb-2'>{getFileName()}</div>
        <div className='flex items-center gap-1'>
          <FileText size={24}/>
          {getFileExt()}
        </div>
      </div>
    </div>
  );
};

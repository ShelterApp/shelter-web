import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import produce from "immer";
import Preview from "./Preview";
import styles from "./styles";
import MdAttach from "react-ionicons/lib/MdAttach";
import Label from "components/Input/components/Label";

interface DragZoneProps {
  onChangeFunction?: Function;
  name: string;
  currentFiles?: any[];
  onlyOneFiles?: boolean;
}

const DragZone = React.memo((props: DragZoneProps) => {
  const { onChangeFunction, name, currentFiles, onlyOneFiles } = props;
  const initFile: any[] = [];
  const [files, setFiles] = useState(initFile);
  const classes = styles();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,",
    onDrop: acceptedFiles => {
      if (!(onlyOneFiles && files.length > 0)) {
        const nextState = produce(files, dragState => {
          acceptedFiles.forEach(file => {
            Object.assign(file, { preview: URL.createObjectURL(file) });
            dragState.push(file);
          });
        });
        setFiles(nextState);
      }
    }
  });

  const parseFile = (currentFiles: any[]) => {
    return currentFiles.map(currentFile => {
      return {
        id: currentFile.id,
        name: currentFile.name,
        preview: currentFile.path + currentFile.file,
        type: currentFile.contentType
      };
    });
  };
  React.useEffect(() => {
    if (currentFiles) {
      setFiles(parseFile(currentFiles));
    }
  }, [currentFiles]);
  React.useEffect(() => {
    if (onChangeFunction) {
      files.map(file => {
        let reader = new FileReader();
        let tmp = file;
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          Object.assign(tmp, { content: String(reader.result) });
        };
        return tmp;
      });
      onChangeFunction({ name: name, value: files });
    }
    // eslint-disable-next-line
  }, [files]);
  const removeUpload = (fileDelete: any) => {
    setFiles(files.filter(file => file !== fileDelete));
  };

  return (
    <React.Fragment>
      <Label>ATTACHMENTS</Label>
      <span
        className={classes.outlinenone}
        {...getRootProps({
          onClick: event => console.log(event)
        })}
      >
        <MdAttach
          color="white"
          fontSize="30px"
          className={classes.attachIcon}
        />
      </span>
      {files.map((file, key) => {
        return <Preview key={key} file={file} removeUpload={removeUpload} />;
      })}
      <input {...getInputProps()} />
    </React.Fragment>
  );
});

export default DragZone;

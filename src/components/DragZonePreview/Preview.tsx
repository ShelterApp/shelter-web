import React from "react";
import useStyles from "./styles";

interface PreviewProps {
  file: any;
  removeUpload: Function;
}

const Preview = React.memo((props: PreviewProps) => {
  const classes = useStyles();
  const { file, removeUpload } = props;

  return (
    <div className={classes.preview}>
      <img
        src={file.preview}
        className={classes.imagePreview}
        alt={"preview" + file.name}
      />
      <i
        className={["la la-close", classes.iconRemove].join(" ")}
        onClick={() => removeUpload(file)}
      />
    </div>
  );
});

export default Preview;

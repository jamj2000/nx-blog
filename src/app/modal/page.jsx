'use client'
import { useRef} from "react";

const App= () => {
  const dialogRef = useRef(null);
  const tooltipRef = useRef(null);

  const openDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  const showTooltip = () => {
    if (tooltipRef.current) tooltipRef.current.show();
  };

  const hideTooltip = () => {
    if (tooltipRef.current) tooltipRef.current.close();
  };

  return (
    <div>
      <button id="open" onClick={openDialog}>
        Open Dialog
      </button>

      <dialog id="dialog" ref={dialogRef}>
        <p>This is a dialog box.</p>
        <button id="close" onClick={closeDialog}>
          Close
        </button>
      </dialog>

      <div className="dialog-wrapper">
        <button id="show" onMouseOver={showTooltip} onMouseOut={hideTooltip}>
          Hover for Tooltip
        </button>

        <dialog id="tooltip" ref={tooltipRef}>
          <p>This is a tooltip.</p>
        </dialog>
      </div>
    </div>
  );
};

export default App;
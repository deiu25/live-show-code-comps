import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import "./NewProject.css";

export const NewProject = () => {
    const [horizontalSizes, setHorizontalSizes] = useState(['50%', '50%']); // Array de dimensiuni pentru panoul orizontal
    const [verticalSizes, setVerticalSizes] = useState(['33%', '34%', '33%']); // Array de dimensiuni pentru panourile verticale

    const layoutCSS = {
      height: "100%",
      overflow: "auto", // Permite scroll dacă conținutul depășește dimensiunea panoului
    };

    return (
      <div className="new-proj-container" style={{ height: "100vh" }}>
        {/* Panou split orizontal */}
        <SplitPane
          split="horizontal"
          sizes={horizontalSizes} // Folosim 'sizes' în loc de 'defaultSizes'
          onChange={(sizes) => setHorizontalSizes(sizes)}
          minSize={50}
        >
          {/* Panou split vertical pentru HTML, CSS, și JavaScript */}
          <SplitPane
          
            split="vertical"
            sizes={verticalSizes} // Folosim 'sizes' în loc de 'defaultSizes'
            onChange={(sizes) => setVerticalSizes(sizes)}
            minSize={50}
          >
            <div style={layoutCSS}>
              <h1>HTML</h1>
              {/* Editorul tău de HTML aici */}
            </div>
            <div style={layoutCSS}>
              <h1>CSS</h1>
              {/* Editorul tău de CSS aici */}
            </div>
            <div style={layoutCSS}>
              <h1>JavaScript</h1>
              {/* Editorul tău de JavaScript aici */}
            </div>
          </SplitPane>
          {/* Panou pentru Preview */}
          <Pane initialSize="50%" minSize="20%">
            <div style={layoutCSS}>
              <h1>Preview</h1>
              {/* Iframe sau alt container pentru preview-ul codului tău aici */}
            </div>
          </Pane>
        </SplitPane>
      </div>
    );
};
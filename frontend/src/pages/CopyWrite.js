import React from "react";
 
const CopyWrite = () => {
return (
<div className="copywrite-container">
<h1>Copyright Policy</h1>
<p> 
© {new Date().getFullYear()} Shooting Star University. All rights reserved. 
</p>
<p>
The content provided here on this website is owned by Shooting Star University 
and it is protected by copyright law. Any unauthorized reproduction or 
distribution of this content is prohibited.
</p>
      <h2>Usage of Content</h2>
      <p>
        Content from Shooting Star University’s website, including text, images, and
        multimedia, may not be copied, reproduced, republished, uploaded, posted, 
        transmitted, or distributed in any way without our prior written permission.
      </p>
      <h2>Exceptions</h2>
      <p>
        Exceptions to the above may be granted for educational purposes, provided 
        that full and proper credit is given to Shooting Star University.
      </p>
      <h2>Contact</h2>
      <p>
        If you wish to inquire about using our content, please contact us at: <br />
        <a href="mailto:legal@shootingstaruniversity.edu">legal@shootingstaruniversity.edu</a>
      </p>
    </div>
  );
};

export default CopyWrite;
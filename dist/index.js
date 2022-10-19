function ITHEditor(selector,options){let element=selector instanceof HTMLElement?selector:document.querySelector(selector);if(!element){throw new Error(`Element for selector: "${selector}"not found`)}options=Object.assign({},{numberLength:4,rows:10,paddingVertical:"0.5em",paddingHorizontal:"8px",fontSize:"16px",lineHeight:"1.3em;",background:"#333",color:"#fff",numberOpacity:"50%"},options);function handle(){html=commonTags?.html??function(){throw new Error("Common Tags not found")}();let area=html`<textarea class="ith-editor--editor" wrap="off"></textarea>`;let custom=false;if((element?.tagName?.toLowerCase()??"nope")==="textarea"){area=element.outerHTML;custom=true}const tmpId="ith-"+String(Math.random()).substring(2);element.outerHTML=html`
                <div class="ith-editor" id="${tmpId}">
                    <div class="ith-editor--numbers"><span></span></div>
                    ${area}
                </div>
            `;element=document.getElementById(tmpId);element.removeAttribute("id");const editor=element.querySelector("textarea");const numbers=element.querySelector(".ith-editor--numbers");if(custom){editor.classList.add("ith-editor--editor");editor.wrap="off"}const updateLines=function(source){if(typeof source==="string"){const lines=source.split("\n").length+200;numbers.innerHTML=Array(lines).fill("<span></span>").join("")}};editor.addEventListener("keydown",function(e){updateLines(e.target.value)},{passive:true});editor.addEventListener("scroll",function(e){numbers.scrollTop=e.target.scrollTop},{passive:true});editor.addEventListener("keydown",function(e){if(e.key==="Tab"){const target=e.target;const start=target.selectionStart;const end=target.selectionEnd;const value=target.value;let padCount=4-start%4;if(!padCount){padCount=4}target.value=value.substring(0,start)+String().padEnd(padCount," ")+value.substring(end);target.selectionStart=target.selectionEnd=target.value.length-(value.length-end);e.preventDefault()}});updateLines(editor.value)}const css=document.querySelector("style#ith-editor");if(!css){const style=document.createElement("style");style.innerHTML=`
                .ith-editor {
                    --padding: ${options.paddingVertical};
                    --hpadding: ${options.paddingHorizontal};
                    --font-size: ${options.fontSize};
                    --line-height: ${options.lineHeight};
                    --number-width: ${options.numberLength}ch;
                    display: flex;
                    font-family: monospace;
                    font-size: var(--font-size);
                    font-weight: normal;
                    line-height: var(--line-height);
                    color: ${options.color};
                    min-height: calc(var(--line-height) * ${options.rows} + 1.5 * var(--padding));
                    position: relative;
                    box-sizing: border-box;
                    background: ${options.background};
                }
                .ith-editor--numbers {
                    min-width: var(--number-width);
                    width: 0;
                    text-align: right;
                    padding: var(--padding) var(--hpadding);
                    white-space: nowrap;
                    overflow: hidden;
                    flex-shrink: 0;
                    line-height: inherit;
                    font-size: inherit;
                    font-family: inherit;
                    color: inherit;
                    font-weight: inherit;
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    border-right: 1px solid rgba(255, 255, 255, .1);
                    background: inherit;
                   
                }
                .ith-editor--numbers > span {
                    counter-increment:  linenumber;
                    margin: 0;
                    filter: opacity(${options.numberOpacity});
                }
                .ith-editor--numbers > span::before {
                    content: counter(linenumber);
                    display: block;
                }
                .ith-editor--editor {
                    outline: none;
                    padding: var(--padding) var(--hpadding);
                    line-height: inherit;
                    font-size: inherit;
                    font-family: inherit;
                    color: inherit;
                    font-weight: inherit;
                    margin: 0 0 0 calc(var(--number-width) + 2 * var(--hpadding) + 1px);
                    flex-grow: 100;
                    resize: none;
                    background: inherit;
                    border: none;
                }
            `;style.id="ith-editor";document.head.appendChild(style)}const common=document.querySelector('script[src^="https://unpkg.com/common-tags"]');if(!common){const commonScript=document.createElement("script");commonScript.classList.add("init");commonScript.onload=function(){commonScript.classList.remove("init");handle()};commonScript.src="https://unpkg.com/common-tags";commonScript.async=true;document.body.appendChild(commonScript)}else{const reload=function(){if(common.classList.contains("init")){window.setTimeout(reload,10)}else{handle()}};reload()}}if("jQuery"in window){if(!("ithEditor"in jQuery.fn)){jQuery.fn.ithEditor=function(options){jQuery(this).each(function(){new ITHEditor(jQuery(this)[0],options)})}}}
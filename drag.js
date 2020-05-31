export default function dragElement(elmnt, handle, touch) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  handle = handle || elmnt;
  handle.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
  (()=>{
    if(!touch) return;
    handle.addEventListener('touchstart', onStart);
    function onStart(e) {
      e = e || window.event;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
      document.addEventListener('touchend', onEnd);
      document.addEventListener('touchmove', onDrag, {passive: false});
    }
    function onDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function onEnd() {
      document.removeEventListener('touchend', onEnd);
      document.removeEventListener('touchmove', onDrag);
    }
  })();
}
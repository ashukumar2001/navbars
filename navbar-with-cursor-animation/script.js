const cursor = document.querySelector(".cursor");
const cursorFollowers = document.querySelectorAll(".follow-cursor");
const moveCursor = (e) => {
  cursor.style.transform = `translate3d(${e.pageX}px, ${e.pageY}px, 0px)`;
};

// Move cursor with pointer
document.addEventListener("mousemove", moveCursor);
// Toggle cursors visibility
document.addEventListener("mouseover", () => {
  cursor.classList.add("cursor--visible");
});
document.addEventListener("mouseleave", () => {
  cursor.classList.remove("cursor--visible");
});
// Active cursor
document.addEventListener("mousedown", () => {
  cursor.classList.add("cursor--active");
});
document.addEventListener("mouseup", () => {
  cursor.classList.remove("cursor--active");
});

cursorFollowers.forEach((el) => {
  const isShowPointer = el.classList.contains("show-pointer");
  if (isShowPointer) {
    el.addEventListener("mouseover", () => {
      cursor.classList.add(
        "cursor--pointer",
        "cursor--exclusion",
        "cursor--xxl"
      );
    });
    el.addEventListener("mouseenter", () => {
      document.removeEventListener("mousemove", moveCursor);
      const { height, width, left, top } = el.getClientRects()[0];
      cursor.style.transform = `translate3d(${left + width / 2}px, ${
        top + height / 2
      }px, 0px)`;
    });
  }
  el.addEventListener("mousemove", (e) => {
    const { height, width, left, top } = el.getClientRects()[0];

    if (isShowPointer) {
      //   move the cursor
      cursor.style.transform = `translate3d(${left + Math.ceil(width / 2)}px, ${
        top + Math.ceil(height / 2)
      }px, 0px)`;
    }
    //   move the element
    el.style.transform = `translate3d(${-(el.offsetLeft - e.pageX) / 5}px, ${
      -(el.offsetTop - e.pageY) / 5
    }px, 0px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = `translate3d(0px, 0px, 0px)`;
    if (isShowPointer) {
      document.addEventListener("mousemove", moveCursor);
      cursor.classList.remove(
        "cursor--pointer",
        "cursor--exclusion",
        "cursor--xxl"
      );
    }
  });
});

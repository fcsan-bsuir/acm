function slider() {
    let marquee = document.getElementById('running-line');
    let width = marquee.offsetWidth;
    let clonesCount = width / 100;

    let slider_item = document.getElementById('slider_item');
    for (i = 0; i < clonesCount; i++) {
        const item_clone = slider_item.cloneNode(true);
        slider_item.parentNode.insertBefore(item_clone, slider_item.nextSibling);
    }
}


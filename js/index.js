window.addEventListener('load', function() {
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseenter', function() {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null
    })
    focus.addEventListener('mouseleave', function() {
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function() {
            next.click();
        }, 2000);

    })
    var img = document.querySelector('.focus_img');
    var point = document.querySelector('.point');
    for (var i = 0; i < img.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-index', i);
        point.appendChild(li);
        li.addEventListener('click', function(e) {
            for (var i = 0; i < point.children.length; i++) {
                point.children[i].className = '';
            }
            e.target.className = 'current';
            num = e.target.getAttribute('data-index');
            animate(img, -focus.offsetWidth * e.target.getAttribute('data-index'));
        })
    }
    point.children[0].className = 'current';
    var first = img.children[0].cloneNode(true);
    img.appendChild(first);
    var flag = 0;
    var change = true; //节流阀功能
    num = 0;
    //右侧按钮
    next.addEventListener('click', function() {
            if (change) {
                change = false;
                if (flag == point.children.length) {
                    img.style.left = 0;
                    flag = 0;
                }
                flag++;
                animate(img, -focus.offsetWidth * flag, function() {
                    change = true;
                });
                num++;
                for (var i = 0; i < point.children.length; i++) {
                    point.children[i].className = '';
                }
                if (num == point.children.length) {
                    num = 0;
                }

                point.children[num].className = 'current';
            }
        })
        //左侧按钮
    prev.addEventListener('click', function() {
        if (flag == 0) {
            img.style.left = -focus.offsetWidth * point.children.length + 'px';
            flag = point.children.length;
        }
        flag--;
        animate(img, -focus.offsetWidth * flag);
        num--;
        for (var i = 0; i < point.children.length; i++) {
            point.children[i].className = '';
        }
        if (num < 0) {
            num = point.children.length - 1;
        }

        point.children[num].className = 'current';
    })
    var timer = setInterval(function() {
        next.click();
    }, 2000)
})
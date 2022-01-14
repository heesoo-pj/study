(() => {
  let yOffset = 0; // window y scroll 값
  let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 섹션의 스크롤 높이의 값
  let currentScene = 0; // 활성화된 section

  // 각 구간의 정보
  const sceneInfo = [
    {
      //0
      type: 'stiky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHiehgt 세팅
      scrollHight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0')
      }
    },
    {
      //1
      type: 'normal',
      heightNum: 5,
      scrollHight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    {
      //2
      type: 'stiky',
      heightNum: 5,
      scrollHight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2')
      }
    },
    {
      //3
      type: 'stiky',
      heightNum: 5,
      scrollHight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    }
  ];

  function setBodyId() {
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  };

  //각 스크롤 섹션 높이 세팅
  function setLayout() {
    for(let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHight}px`;
    }

    let totalScrollHeight = 0;
    for(let i=0; i< sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHight;
    
      if(totalScrollHeight >= window.pageYOffset) {
        currentScene = i;
        break;
      }
    }
    setBodyId();
  };

  
  function scrollLoop() {
    prevScrollHeight = 0;
    for(let i = 0; i < currentScene; i++) {
      prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHight;
    };
    
    if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHight) {
      currentScene++;
      setBodyId();
    } 

    if(yOffset < prevScrollHeight) {
      if(currentScene === 0) return;
    
      currentScene--;
      setBodyId();
    }
  };


  // window.addEventListener('DOMContentLoaded', setLayout)
  window.addEventListener('load', setLayout)
  window.addEventListener('resize', setLayout);

  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;

    scrollLoop();
  });

})();
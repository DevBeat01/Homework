// 轮播图功能实现
document.addEventListener('DOMContentLoaded', function () {
  const carouselContainer = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  let currentIndex = 0;
  let interval;

  // 初始化轮播图
  function initCarousel() {
    showSlide(0);
    startAutoSlide();

    // 鼠标悬停时暂停自动轮播
    carouselContainer.addEventListener('mouseenter', pauseAutoSlide);
    // 鼠标移开时恢复自动轮播
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
    // 点击上一张按钮
    prevBtn.addEventListener('click', showPrevSlide);
    // 点击下一张按钮
    nextBtn.addEventListener('click', showNextSlide);
    // 点击指示器
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => showSlide(index));
    });
  }

  // 显示指定索引的轮播图
  function showSlide(index) {
    // 隐藏所有轮播图
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    // 移除所有指示器的活动状态
    indicators.forEach(indicator => {
      indicator.classList.remove('active');
    });
    // 显示当前轮播图
    slides[index].classList.add('active');
    // 激活当前指示器
    indicators[index].classList.add('active');
    // 更新当前索引
    currentIndex = index;
  }

  // 显示上一张轮播图
  function showPrevSlide() {
    let index = currentIndex - 1;
    if (index < 0) {
      index = slides.length - 1;
    }
    showSlide(index);
  }

  // 显示下一张轮播图
  function showNextSlide() {
    let index = currentIndex + 1;
    if (index >= slides.length) {
      index = 0;
    }
    showSlide(index);
  }

  // 开始自动轮播
  function startAutoSlide() {
    interval = setInterval(showNextSlide, 3000);
  }

  // 暂停自动轮播
  function pauseAutoSlide() {
    clearInterval(interval);
  }

  // 初始化轮播图（仅在存在轮播图元素时执行）
  if (carouselContainer) {
    initCarousel();
  } else {
    console.log('No carousel container found, skipping carousel initialization...');
  }

  // 播放列表
  const playlist = [
    {
      title: 'Dehors',
      artist: 'JORDANN',
      src: './audio/Dehors.mp3',
      cover: './img/bofang.png'
    },
    {
      title: 'I Really Like You',
      artist: 'Carly Rae Jepsen',
      src: './audio/I Really Like You.mp3',
      cover: './img/bofang.png'
    },
    {
      title: 'Bang Bang',
      artist: 'IVE',
      src: './audio/Bang Bang.mp4',
      cover: './img/bofang.png'
    },
    {
      title: 'Gone',
      artist: 'Harry Hudson',
      src: './audio/gone.mp3',
      cover: './img/bofang.png'
    },
    {
      title: 'Oops',
      artist: 'Various Artists',
      src: './audio/oops.mp3',
      cover: './img/bofang.png'
    },
    {
      title: 'Blue Skies',
      artist: 'Various Artists',
      src: './audio/blueskies.mp3',
      cover: './img/bofang.png'
    },
    {
      title: 'All Falls Down',
      artist: 'Various Artists',
      src: './audio/All Falls Down.mp3',
      cover: './img/bofang.png'
    },
    {
      title: 'We\'ll Meet Again',
      artist: 'Various Artists',
      src: './audio/We\'ll Meet Again.mp3',
      cover: './img/bofang.png'
    },
    {
      title: 'Moonlight Shadow',
      artist: 'Various Artists',
      src: './audio/Moonlight Shadow.mp3',
      cover: './img/bofang.png'
    },
    {
      title: 'Gravity',
      artist: 'Various Artists',
      src: './audio/Gravity.mp3',
      cover: './img/bofang.png'
    }
  ];

  let currentSongIndex = 0;

  // 播放音乐功能
  console.log('Initializing audio player...');
  const playBtn = document.querySelector('.play-btn');
  const audioPlayer = document.getElementById('audio-player');
  const progressBarContainer = document.querySelector('.progress-bar-container');
  const progressBar = document.querySelector('.progress-bar');
  let playIcon = playBtn ? playBtn.querySelector('i') : null;
  let isShowingImage = false;
  let isDragging = false;

  console.log('Play button:', playBtn);
  console.log('Audio player:', audioPlayer);
  console.log('Play icon:', playIcon);
  console.log('Progress bar container:', progressBarContainer);
  console.log('Progress bar:', progressBar);
  console.log('Playlist:', playlist);

  // 初始化音频播放器
  function initAudioPlayer() {
    if (audioPlayer) {
      console.log('Audio player initialized');
      // 尝试加载第一首歌曲
      if (playlist.length > 0) {
        const firstSong = playlist[0];
        audioPlayer.src = firstSong.src;
        console.log('First song loaded:', firstSong.title);
        console.log('First song src:', firstSong.src);

        // 更新歌曲信息
        const songTitle = document.querySelector('.bofanglan .box-l ul li:nth-child(2) h4 a');
        const songArtist = document.querySelector('.bofanglan .box-l ul li:nth-child(2) p a');
        const songCover = document.querySelector('.bofanglan .box-l ul li:first-child img');

        console.log('Song title element:', songTitle);
        console.log('Song artist element:', songArtist);
        console.log('Song cover element:', songCover);

        if (songTitle) songTitle.textContent = firstSong.title;
        if (songArtist) songArtist.textContent = firstSong.artist;
        if (songCover) songCover.src = firstSong.cover;
      }

      // 添加ended事件监听器，实现自动播放下一首
      audioPlayer.addEventListener('ended', function () {
        console.log('Song ended, playing next song...');
        playNextSong();
      });
    }
  }

  // 调用初始化音频播放器函数
  initAudioPlayer();

  // 初始化进度条
  function initProgressBar() {
    if (audioPlayer && progressBar) {
      console.log('Initializing progress bar events...');
      // 音频播放时间更新事件
      audioPlayer.addEventListener('timeupdate', updateProgressBar);

      // 音频加载元数据事件
      audioPlayer.addEventListener('loadedmetadata', updateProgressBar);

      // 进度条点击事件
      if (progressBarContainer) {
        console.log('Adding click event listener to progress bar container...');
        progressBarContainer.addEventListener('click', function (e) {
          console.log('Progress bar container clicked!', e);
          seek(e);
        });

        // 进度条拖拽事件
        console.log('Adding mousedown event listener to progress bar container...');
        progressBarContainer.addEventListener('mousedown', function (e) {
          console.log('Mouse down on progress bar container!', e);
          isDragging = true;
          seek(e);
        });

        console.log('Adding mousemove event listener to document...');
        document.addEventListener('mousemove', function (e) {
          if (isDragging) {
            console.log('Mouse moving while dragging!', e);
            seek(e);
          }
        });

        console.log('Adding mouseup event listener to document...');
        document.addEventListener('mouseup', function () {
          if (isDragging) {
            console.log('Mouse up, ending drag!');
            isDragging = false;
          }
        });
      }
    }
  }

  // 更新进度条
  function updateProgressBar() {
    if (audioPlayer && progressBar && !isDragging) {
      const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.style.width = percent + '%';
    }
  }

  // 跳转播放位置
  function seek(e) {
    if (audioPlayer && progressBarContainer) {
      const rect = progressBarContainer.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percent = offsetX / rect.width;
      const seekTime = percent * audioPlayer.duration;

      audioPlayer.currentTime = seekTime;
      progressBar.style.width = percent * 100 + '%';
    }
  }

  if (playBtn && audioPlayer) {
    console.log('Adding event listener to play button...');
    playBtn.addEventListener('click', function (e) {
      console.log('Play button clicked!');
      e.preventDefault();

      try {
        if (audioPlayer.paused) {
          console.log('Playing audio...');
          audioPlayer.play().then(function () {
            console.log('Audio started playing successfully');
            // 切换为图片
            if (playIcon && !isShowingImage) {
              const img = document.createElement('img');
              img.src = './img/bofang1.png';
              img.alt = '播放';
              img.style.width = '38px';
              img.style.height = '38px';
              img.style.display = 'inline-block';
              img.style.margin = '0';
              img.style.padding = '0';
              img.style.verticalAlign = 'middle';
              img.style.lineHeight = '75px';
              playIcon.replaceWith(img);
              playIcon = img;
              isShowingImage = true;
              console.log('Changed to image');
            }
          }).catch(function (error) {
            console.error('Error playing audio:', error);
          });
        } else {
          console.log('Pausing audio...');
          audioPlayer.pause();
          // 切换回图标
          if (playIcon && isShowingImage) {
            const icon = document.createElement('i');
            icon.className = 'iconfont icon-bofang bofang';
            icon.style.width = '32px';
            icon.style.height = '32px';
            icon.style.display = 'block';
            icon.style.margin = '0';
            icon.style.padding = '0';
            icon.style.verticalAlign = 'middle';
            icon.style.lineHeight = '32px';
            icon.style.textAlign = 'center';
            playIcon.replaceWith(icon);
            playIcon = icon;
            isShowingImage = false;
            console.log('Changed back to icon');
          }
        }
      } catch (error) {
        console.error('Error in play button click handler:', error);
      }
    });
  } else {
    console.error('Play button or audio player not found!');
  }

  // 获取上一首和下一首按钮
  const boxC = document.querySelector('.box-c');
  console.log('Box C:', boxC);

  if (boxC) {
    const ul = boxC.querySelector('ul');
    console.log('Box C ul:', ul);

    if (ul) {
      const liElements = ul.querySelectorAll('li');
      console.log('Li elements in box C:', liElements.length);

      for (let i = 0; i < liElements.length; i++) {
        console.log(`Li ${i + 1}:`, liElements[i]);
      }
    }
  }

  const prevSongBtn = document.querySelector('.bofanglan .box-c ul li:nth-child(2) a');
  const nextSongBtn = document.querySelector('.bofanglan .box-c ul li:nth-child(4) a');

  console.log('Previous song button:', prevSongBtn);
  console.log('Next song button:', nextSongBtn);

  // 为上一首和下一首按钮添加点击事件监听器
  if (prevSongBtn) {
    console.log('Adding click event listener to previous song button...');
    prevSongBtn.addEventListener('click', function (e) {
      console.log('Previous song button clicked!');
      e.preventDefault();
      console.log('Current song index before:', currentSongIndex);
      playPrevSong();
      console.log('Current song index after:', currentSongIndex);
    });
  } else {
    console.error('Previous song button not found!');
  }

  if (nextSongBtn) {
    console.log('Adding click event listener to next song button...');
    nextSongBtn.addEventListener('click', function (e) {
      console.log('Next song button clicked!');
      e.preventDefault();
      console.log('Current song index before:', currentSongIndex);
      playNextSong();
      console.log('Current song index after:', currentSongIndex);
    });
  } else {
    console.error('Next song button not found!');
  }

  // 播放指定索引的歌曲
  function playSong(index) {
    if (index >= 0 && index < playlist.length) {
      currentSongIndex = index;
      const song = playlist[currentSongIndex];

      // 更新音频源
      audioPlayer.src = song.src;

      // 更新歌曲信息
      const songTitle = document.querySelector('.bofanglan .box-l ul li:nth-child(2) h4 a');
      const songArtist = document.querySelector('.bofanglan .box-l ul li:nth-child(2) p a');
      const songCover = document.querySelector('.bofanglan .box-l ul li:first-child img');

      if (songTitle) songTitle.textContent = song.title;
      if (songArtist) songArtist.textContent = song.artist;
      if (songCover) songCover.src = song.cover;

      // 播放歌曲
      audioPlayer.play().then(function () {
        console.log('Playing song:', song.title);
        // 切换为图片
        if (playIcon && !isShowingImage) {
          const img = document.createElement('img');
          img.src = './img/bofang1.png';
          img.alt = '播放';
          img.style.width = '38px';
          img.style.height = '38px';
          img.style.display = 'inline-block';
          img.style.margin = '0';
          img.style.padding = '0';
          img.style.verticalAlign = 'middle';
          img.style.lineHeight = '75px';
          playIcon.replaceWith(img);
          playIcon = img;
          isShowingImage = true;
        }
      }).catch(function (error) {
        console.error('Error playing song:', error);
      });
    }
  }

  // 上一首
  function playPrevSong() {
    let index = currentSongIndex - 1;
    if (index < 0) {
      index = playlist.length - 1;
    }
    playSong(index);
  }

  // 下一首
  function playNextSong() {
    let index = currentSongIndex + 1;
    if (index >= playlist.length) {
      index = 0;
    }
    playSong(index);
  }

  // 事件监听器已在前面添加

  // 初始化进度条
  initProgressBar();

  // 为歌曲列表项添加双击事件监听器
  function initSongListDoubleClick() {
    const listItems = document.querySelectorAll('.list-item');
    console.log('Found list items:', listItems.length);

    listItems.forEach((item, index) => {
      item.addEventListener('dblclick', function () {
        console.log('Double clicked on song item:', index + 1);

        // 从歌曲项中提取歌曲信息
        const songTitleElement = item.querySelector('.song-info h4');
        const songArtistElement = item.querySelector('.song-info p');

        if (songTitleElement) {
          const songTitle = songTitleElement.textContent.trim();
          console.log('Song title:', songTitle);

          // 构建音频文件路径
          // 注意：这里需要根据实际的音频文件命名规则进行调整
          // 目前假设音频文件名称与歌曲标题匹配
          let audioFileName = songTitle;
          // 移除特殊字符，只保留字母、数字和空格
          audioFileName = audioFileName.replace(/[^a-zA-Z0-9\s]/g, '');
          // 将多个空格替换为单个空格
          audioFileName = audioFileName.replace(/\s+/g, ' ');
          // 将空格替换为下划线
          audioFileName = audioFileName.replace(/\s/g, '_');
          // 转换为小写
          audioFileName = audioFileName.toLowerCase();

          const audioPath = `./audio/${audioFileName}.mp3`;
          console.log('Attempting to play audio:', audioPath);

          // 检查播放列表中是否有对应的歌曲
          let songFound = false;

          // 清理歌曲标题，移除括号内容
          let cleanSongTitle = songTitle;
          // 移除括号及其内容
          cleanSongTitle = cleanSongTitle.replace(/\s*\([^)]*\)\s*/g, '');
          console.log('Clean song title:', cleanSongTitle);

          for (let i = 0; i < playlist.length; i++) {
            const playlistSong = playlist[i];
            // 清理播放列表中的歌曲标题
            let cleanPlaylistTitle = playlistSong.title.replace(/\s*\([^)]*\)\s*/g, '');

            if (playlistSong.title.toLowerCase().includes(songTitle.toLowerCase()) ||
              cleanPlaylistTitle.toLowerCase().includes(cleanSongTitle.toLowerCase())) {
              console.log('Found matching song in playlist:', playlistSong.title);
              playSong(i);
              songFound = true;
              break;
            }
          }

          if (!songFound) {
            console.log('Song not found in playlist, trying direct path...');
            // 如果播放列表中没有找到，尝试直接设置音频源
            if (audioPlayer) {
              audioPlayer.src = audioPath;
              audioPlayer.play().then(function () {
                console.log('Audio started playing successfully');
                // 切换为播放图片
                if (playIcon && !isShowingImage) {
                  const img = document.createElement('img');
                  img.src = './img/bofang1.png';
                  img.alt = '播放';
                  img.style.width = '38px';
                  img.style.height = '38px';
                  img.style.display = 'inline-block';
                  img.style.margin = '0';
                  img.style.padding = '0';
                  img.style.verticalAlign = 'middle';
                  img.style.lineHeight = '75px';
                  playIcon.replaceWith(img);
                  playIcon = img;
                  isShowingImage = true;
                }
              }).catch(function (error) {
                console.error('Error playing audio:', error);
                alert('无法播放该歌曲：' + error.message);
              });
            }
          }
        }
      });
    });
  }

  // 初始化歌曲列表双击功能
  initSongListDoubleClick();
});
<AwesomeSlider cssModule={AwsSliderStyles}>
  {props.bannerFeed.map(banner => (
    <div key={banner.title}>
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${banner.bannerImage})` }}
      >
        <div className={styles.meta}>
          <span className={styles.bannerTitle}>{banner.title}</span>
          <span
            className={styles.bannerSub}
            dangerouslySetInnerHTML={{ __html: banner.short_description }}
          />
          <span className={styles.button}>보러가기</span>
        </div>
        <div className={styles.profile}>
          <img
            src={banner.creator.profile_image || require("images/noPhoto.jpg")}
            alt={banner.creator.username}
            className={styles.profileImage}
          />
          <div className={styles.profileText}>
            <span className={styles.creator}>{banner.creator.username}</span>
            <span className={styles.divider}> / </span>
            <span className={styles.location}>{banner.location}</span>
          </div>
          <span className={styles.price}>120,000</span>
        </div>
      </div>
    </div>
  ))}
</AwesomeSlider>;

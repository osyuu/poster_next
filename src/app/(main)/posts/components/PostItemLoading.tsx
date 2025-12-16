import itemStyles from "./PostItem.module.css";
import loadingStyles from "./PostItemLoading.module.css";

export default function PostItemLoading() {
  return (
    <div className={itemStyles["post-item-wrapper"]}>
      <div
        className={itemStyles["post-item"]}
        style={{ cursor: "default", pointerEvents: "none" }}
      >
        <div className={itemStyles["avatar-container"]}>
          <div
            className={`${loadingStyles.skeleton} ${loadingStyles.avatar}`}
          />
        </div>
        <div className={itemStyles["main-container"]}>
          <div className={itemStyles["header"]}>
            <div className={itemStyles["header-title"]}>
              <div
                className={`${loadingStyles.skeleton} ${loadingStyles.author}`}
              />
            </div>
          </div>
          <div
            className={itemStyles["content"]}
            style={{ marginTop: "0.5rem" }}
          >
            <div
              className={`${loadingStyles.skeleton} ${loadingStyles.contentLine}`}
            />
            <div
              className={`${loadingStyles.skeleton} ${loadingStyles.contentLineShort}`}
            />
          </div>
          <div className={itemStyles["footer"]} style={{ marginTop: "0.5rem" }}>
            <div
              className={`${loadingStyles.skeleton} ${loadingStyles.footer}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

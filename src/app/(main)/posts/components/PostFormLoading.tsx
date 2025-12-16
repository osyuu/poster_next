import formStyles from "./PostForm.module.css";
import loadingStyles from "./PostFormLoading.module.css";

export function PostFormLoading() {
  return (
    <div className={formStyles["post-form"]}>
      <div className={formStyles["avatar-container"]}>
        <div className={`${loadingStyles.skeleton} ${loadingStyles.avatar}`} />
      </div>
      <div className={formStyles["main-container"]}>
        <div className={formStyles["content"]}>
          <div className={`${loadingStyles.skeleton} ${loadingStyles.input}`} />
        </div>
        <div className={formStyles["footer"]}>
          <div
            className={`${loadingStyles.skeleton} ${loadingStyles.button}`}
          />
        </div>
      </div>
    </div>
  );
}

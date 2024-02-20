interface ISpeaker extends ICOEIROINK_Speaker {
    /**
     * 最終更新日時
     */
    last_updated: Date;

    /**
     * 最終更新確認日時
     */
    last_update_check: Date;

    /**
     * 制作者
     */
    author: IAuthor;

    /**
     * 配布ページ
     */
    distribution_page: string;

    /**
     * Direct Download URL
     */
    direct_download_url: string;
    /**
     * Folder path
     */
    folder_path: string;
}

interface IAuthor {
    /**
     * 制作者の名前
     */
    name: string;

    /**
     * 制作者のID
     */
    id: string;

    /**
     * 制作者のUnique ID(UUID)
     */
    unique_id: string;

    /**
     * 制作者のアイコン(URL or Base64 encoded image data)
     */
    icon: string;

    /**
     * 制作者のSNS
     */
    sns: IAuthor_SNS[];
}

interface IAuthor_SNS {
    /**
     * 制作者のSNSの名前
     */
    name: string;

    /**
     * 制作者のSNSのURL
     */
    url: string;

    /**
     * SNSのアイコン
     */
    icon: string;
}

/**
 * COEIROINK 話者の情報
 */
interface ICOEIROINK_Speaker {
    /**
     * 話者の名前
     * @example "つくよみちゃん"
     */
    name: string;
    /**
     * 話者のID
     * @example "3c37646f-3881-5374-2a83-149267990abc"
     */
    id: string;
    /**
     * 話者のスタイル
     * @type {IStyle[]}
     */
    styles: IStyle[],
    /**
     * Base64 encoded image data (NOT BASE64)
     * @example "file:///C:/Users/user/Desktop/COEIROINK/speakers/3c37646f-3881-5374-2a83-149267990abc/portrait.png"
     */
    portrait: string;
    /**
     * Markdown
     */
    policy: string;
    /**
     * Text
     */
    license: string;
    /**
     * ボイスのバージョン
     * @example "1.0.0"
     */
    version: string | null;
}
interface IStyle {
    /**
     * 話者のスタイルのID(ユニーク)
     * @example 0
     */
    id: number;
    /**
     * 話者のスタイルの名前
     * @example "つくよみちゃん"
     */
    name: string;
    /**
     * URL to the icon image (MAYBE BASE64)
     */
    icon: string;
    /**
     * Array of URL to the sample voices (NOT BASE64)
     */
    voices: IVoice[];
    /**
     * URL to the image (NOT BASE64)
     */
    portrait: string;
}
interface IVoice {
  /**
   * ボイスのファイル名
   */
  name: string;
  /**
   * ボイスのファイルURL
   */
  url: string;
}
export { ICOEIROINK_Speaker, IStyle, ISpeaker, IAuthor, IAuthor_SNS, IVoice }

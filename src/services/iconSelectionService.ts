export const getIconSrc = (fileName: string) => {
    const assetFolder = "src/assets/icons/";
    let icon;

    const splitted = fileName.split(".");
    const extension = splitted[splitted.length - 1];

    if (splitted.length < 2) {
        icon = "file.svg";
    }
    else {
        switch (extension) {
            case "ts":
                icon = "typescript.svg";
                break;
            case "dart":
                icon = "dart.svg";
                break;
            case "scss":
                icon = "sass.svg";
                break;
            case "cs":
                icon = "csharp.svg";
                break;
            default:
                icon = "file.svg";
                break;
        }
    }

    return assetFolder + icon;
};
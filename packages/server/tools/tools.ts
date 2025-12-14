import { readFile } from "./readFile";
import { stringReplace } from "./stringReplace";
import { editFile } from "./editFile";
import { deleteFile } from "./deleteFile";
import { globTool } from "./glob";
import { listDirectory } from "./listDirectory";

export const tools = {
    readFile: readFile,
    stringReplace: stringReplace,
    editFile: editFile,
    deleteFile: deleteFile,
    glob: globTool,
    listDirectory: listDirectory,
}
import React from 'react';
import { Download } from 'lucide-react';
import packageJson from '../../package.json';
import { TOUCH_TARGET } from '../components/hud/touchTarget';
import { PlaygroundDialog } from './PlaygroundDialog';

/** Built into `public/downloads/` by `scripts/build_exporter_package.mjs`, relative to the page (works from a sub-path). */
const PACKAGE_URL = `${import.meta.env.BASE_URL}downloads/nop-exporter.zip`;
const SCRIPT_URL = `${import.meta.env.BASE_URL}downloads/nop_exporter.py`;

/** Houdini preferences folders per operating system (Houdini 22). */
const PREFERENCE_FOLDERS: Array<[string, string]> = [
  ['Windows', 'Documents\\houdini22.0\\packages'],
  ['macOS', '~/Library/Preferences/houdini/22.0/packages'],
  ['Linux', '~/houdini22.0/packages'],
];

/**
 * Props for the playground's exporter download dialog (`ExporterDialog`).
 */
export interface ExporterDialogProps {
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when the dialog closes. */
  onClose: () => void;
}

/**
 * Download and install steps for the NOP Houdini exporter (a Houdini package with a NOP shelf).
 */
export const ExporterDialog: React.FC<ExporterDialogProps> = ({ open, onClose }) => (
  <PlaygroundDialog open={open} onClose={onClose} title="Get the Houdini exporter" maxWidthPx={600}>
    <div className="overflow-y-auto px-4 py-3 space-y-4 text-[13px] leading-normal">
      <p>
        The exporter is a Houdini package. It adds a <b>NOP</b> shelf with two tools: <b>Export for NOP</b> (copy to
        the clipboard or save a .json file) and <b>Copy for NOP</b> (copy the selection without a dialog).
      </p>

      <a
        href={PACKAGE_URL}
        download
        className={`inline-flex items-center gap-2 h-9 px-3 rounded-[3px] bg-[#474e62] hover:bg-[#535b72] text-white font-bold ${TOUCH_TARGET}`}
      >
        <Download className="w-4 h-4" />
        Download nop-exporter.zip
        <span className="font-normal text-[#c4c9d8]">({packageJson.version})</span>
      </a>

      <section>
        <h3 className="font-bold text-[#d2dcfb] mb-1.5">Install</h3>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            Open the <code className="font-mono text-[12px]">packages</code> folder in your Houdini preferences (create
            it if it does not exist):
            <ul className="mt-1 space-y-0.5">
              {PREFERENCE_FOLDERS.map(([os, folder]) => (
                <li key={os} className="flex flex-wrap gap-x-2">
                  <span className="w-16 shrink-0 text-[#9a9a9a]">{os}</span>
                  <code className="min-w-0 font-mono text-[12px] select-all">
                    {/* Line breaks only after a slash on narrow screens */}
                    {folder.split(/(?<=[\\/])/).map((part, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && <wbr />}
                        {part}
                      </React.Fragment>
                    ))}
                  </code>
                </li>
              ))}
            </ul>
          </li>
          <li>
            Copy <code className="font-mono text-[12px]">nop.json</code> and the{' '}
            <code className="font-mono text-[12px]">nop</code> folder from the zip into it.
          </li>
          <li>
            Restart Houdini. The <b>NOP</b> shelf tab appears at the top. If it does not, click the <b>+</b> next to the
            shelf tabs and choose Shelves, then NOP.
          </li>
        </ol>
      </section>

      <section>
        <h3 className="font-bold text-[#d2dcfb] mb-1.5">Use</h3>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>Open a network in Houdini. Select nodes to export only those, or nothing for the whole network.</li>
          <li>
            Click <b>Export for NOP</b> and choose <i>Copy to Clipboard</i>, then press <b>Ctrl+V</b> on this page.
            Or save a .json file and use <b>Open .json</b>.
          </li>
        </ol>
        <p className="mt-2 text-[#9a9a9a]">
          Optional hotkey: hold Ctrl+Alt+Shift and click <b>Copy for NOP</b>, then add a key such as Ctrl+Shift+Alt+C.
        </p>
      </section>

      <p className="text-[#9a9a9a] border-t border-[#1f1f1f] pt-3">
        Tested with Houdini 22.0.466. Prefer a manual shelf tool? Download the plain{' '}
        <a href={SCRIPT_URL} download className="text-[#8c96b2] underline hover:text-[#d2dcfb]">
          nop_exporter.py
        </a>{' '}
        and paste it into a new shelf tool. Update by replacing the nop folder; uninstall by deleting nop.json and the
        nop folder.
      </p>
    </div>
  </PlaygroundDialog>
);

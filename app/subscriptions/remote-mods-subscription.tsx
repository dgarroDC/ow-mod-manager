import { useCallback } from 'react';

import { useSetRecoilState, useRecoilValue } from 'recoil';
import { getModDatabase } from '../services';
import { useModsDirectoryWatcher } from '../hooks';
import {
  remoteModList,
  settingsState,
  modManager as modManagerState,
} from '../store';

export const RemoteModsSubscription: React.FunctionComponent = () => {
  const setRemoteMods = useSetRecoilState(remoteModList);
  const setModManager = useSetRecoilState(modManagerState);
  const { modDatabaseUrl, owmlPath, alphaPath } = useRecoilValue(settingsState);

  useModsDirectoryWatcher(
    useCallback(() => {
      const updateMods = async () => {
        const { mods, modManager } = await getModDatabase(
          modDatabaseUrl,
          owmlPath,
          alphaPath
        );
        setRemoteMods(mods);
        setModManager(modManager);
      };
      updateMods();
    }, [modDatabaseUrl, owmlPath, alphaPath, setRemoteMods, setModManager])
  );

  return null;
};

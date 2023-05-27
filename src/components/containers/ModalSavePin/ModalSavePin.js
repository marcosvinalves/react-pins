import { useEffect, useState } from 'react';
import { Modal } from '../../Modal/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from '../../Button/Button';
import { useAppContext } from '../../../store/AppContext';
import { closeModalAction } from '../../../store/actions';
import { 
  fetchFoldersAction, 
  openModalCreateFolder,
  savePinInFolderAction
 } from '../../../store/actions';

export const ModalSavePin = ({ open }) => {
    const { state, dispatch } = useAppContext();
    const [ itensLoading, setItensLoading ] = useState({});

    const handleClose = () => {
        dispatch(closeModalAction())
    }

    const handleClickCreateFolder = () => {
        dispatch(openModalCreateFolder());
    }

    const handleClick = async (folderId) => {
      setItensLoading((prevState) => {
        return {
          ...prevState,
          [folderId]: true
        }
      })

      await savePinInFolderAction(dispatch, state.activePinId, folderId);

      setItensLoading((prevState) => {
        return {
          ...prevState,
          [folderId]: false
        }
      })
    }

    const foldersNormalized = state.folders.map(folder => {
      return ({
        ...folder,
        saved: folder.pins.includes(state.activePinId)
      })
    })

    useEffect(() => {
        fetchFoldersAction(dispatch);
    }, [])

    useEffect(() => {
      console.log(state)
  }, [state])

    return (
        <Modal 
        title='Salvar pin' 
        open={open} 
        onHide={handleClose}
        controls={[
            {
                label: 'Criar pasta',
                variant: 'secondary',
                loading: false,
                loadingLabel: 'Criando',
                onClick: handleClickCreateFolder
            }
        ]}>
        <ListGroup variant="flush">
        {foldersNormalized.map((folder, folderIndex) => (
          <ListGroup.Item key={folderIndex}>
            <Row>
              <Col xs={8}>{folder.name}</Col>
              <Col xs={4} className="text-end">
                <Button
                  label={folder.saved ? 'Salvo' : 'Salvar'}
                  loadingLabel="Salvando"
                  onClick={() => handleClick(folder.id)}
                  variant={folder.saved ? 'secondary' : 'primary'}
                  disabled={folder.saved}
                  loading={itensLoading[folder.id]}
                />
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
        </Modal>
    )
}
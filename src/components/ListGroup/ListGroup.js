import { ListGroup as ListGroupBS } from "react-bootstrap"
import Badge from "react-bootstrap/Badge"

export const ListGroup = ({ items = [] }) => {
    return (
        <ListGroupBS as="ul">
            {items.map(item => (
                      <ListGroupBS.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.title}</div>
                      </div>
                        <Badge bg="primary" pill>
                          {item.total ? item.total : 0}
                        </Badge>
                    </ListGroupBS.Item>
            ))}
        </ListGroupBS>
    )
}
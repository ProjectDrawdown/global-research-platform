"""add technology column

Revision ID: d657375bff6e
Revises: 548291c42e11
Create Date: 2021-07-29 16:50:50.626868

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd657375bff6e'
down_revision = '548291c42e11'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('adoption_data', sa.Column('technology', sa.String(), nullable=True))
    op.add_column('ca_pds', sa.Column('technology', sa.String(), nullable=True))
    op.add_column('ca_ref', sa.Column('technology', sa.String(), nullable=True))
    op.add_column('reference', sa.Column('technology', sa.String(), nullable=True))
    op.add_column('scenario', sa.Column('technology', sa.String(), nullable=True))
    op.add_column('tam', sa.Column('technology', sa.String(), nullable=True))
    op.add_column('variation', sa.Column('technology', sa.String(), nullable=True))
    op.add_column('vma', sa.Column('technology', sa.String(), nullable=True))

def downgrade():
    op.drop_column('adoption_data', 'technology')
    op.drop_column('ca_pds', 'technology')
    op.drop_column('ca_ref', 'technology')
    op.drop_column('reference', 'technology')
    op.drop_column('scenario', 'technology')
    op.drop_column('tam', 'technology')
    op.drop_column('variation', 'technology')
    op.drop_column('vma', 'technology')

